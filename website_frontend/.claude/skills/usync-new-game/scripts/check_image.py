"""Check that an image can be used for a new game on usync.gg.

Usage: python check_image.py <path> --kind bubble|header

Passes only if the file exists, ends in .webp, is really WebP inside, is the
exact size for its kind, and has a date in its file name. Reads the file
header directly, so no image library is needed.
"""
import argparse
import re
import struct
import sys
from pathlib import Path

SIZES = {
    "bubble": (648, 864),
    "header": (1920, 320),
}

# 9.6.26, 9-13-2026, 10_29_26 ...
DATE_RE = re.compile(r"(?<!\d)(\d{1,2})[.\-_](\d{1,2})[.\-_](\d{4}|\d{2})(?!\d)")


def sniff_format(head: bytes) -> str:
    if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
        return "WEBP"
    if head[:8] == b"\x89PNG\r\n\x1a\n":
        return "PNG"
    if head[:3] == b"\xff\xd8\xff":
        return "JPEG"
    if head[:6] in (b"GIF87a", b"GIF89a"):
        return "GIF"
    return "unknown"


def webp_size(head: bytes):
    chunk = head[12:16]
    if chunk == b"VP8X":
        width = int.from_bytes(head[24:27], "little") + 1
        height = int.from_bytes(head[27:30], "little") + 1
        return width, height
    if chunk == b"VP8 ":
        if head[23:26] != b"\x9d\x01\x2a":
            return None
        width, height = struct.unpack("<HH", head[26:30])
        return width & 0x3FFF, height & 0x3FFF
    if chunk == b"VP8L":
        if head[20] != 0x2F:
            return None
        bits = int.from_bytes(head[21:25], "little")
        return (bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1
    return None


def has_date(name: str) -> bool:
    for month, day, _year in DATE_RE.findall(name):
        if 1 <= int(month) <= 12 and 1 <= int(day) <= 31:
            return True
    return False


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("path")
    parser.add_argument("--kind", choices=SIZES, required=True)
    args = parser.parse_args()

    path = Path(args.path.strip().strip('"'))
    want_w, want_h = SIZES[args.kind]
    problems = []

    if not path.is_file():
        print(f"FAIL: no file found at {path}")
        return 1

    if path.suffix.lower() != ".webp":
        problems.append(f"the file must be a .webp (this one is {path.suffix or 'no extension'})")

    head = path.read_bytes()[:64]
    fmt = sniff_format(head)
    if fmt != "WEBP":
        problems.append(f"it's actually a {fmt} file inside, not WebP; export it as WebP")
        size = None
    else:
        size = webp_size(head)
        if size is None:
            problems.append("couldn't read the WebP image size; re-export the file")
        elif size != (want_w, want_h):
            problems.append(f"it's {size[0]} x {size[1]}, but a {args.kind} must be exactly {want_w} x {want_h}")

    if not has_date(path.name):
        problems.append("the file name needs a date in it (like _10.29.26 or (10.29.26))")

    if problems:
        print(f"FAIL: {path.name}")
        for p in problems:
            print(f"  - {p}")
        return 1

    print(f"OK: {path.name} is WebP, {want_w} x {want_h}, dated")
    return 0


if __name__ == "__main__":
    sys.exit(main())
