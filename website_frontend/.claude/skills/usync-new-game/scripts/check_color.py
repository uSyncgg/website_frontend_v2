"""Check a new game's accent color against the colors already in use.

Usage: python check_color.py "#RRGGBB"

Reads the home page tile accents (ChooseYourGame.module.css) and the LAN map
marker colors (LanMap.jsx) straight from the source, so it stays current as
games are added. Exits 1 if the color is too close to one already used.
"""
import math
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]  # website_frontend/
CSS = ROOT / "src/components/ChooseYourGame/ChooseYourGame.module.css"
LAN_MAP = ROOT / "src/components/LanMap/LanMap.jsx"

# "redmean" distance runs 0-765; below this two colors read as the same hue on the site.
MIN_DISTANCE = 100

HEX_RE = r"#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b"
RGB_RE = r"rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)"
COLOR_RE = f"({HEX_RE}|{RGB_RE})"


def parse(color: str):
    color = color.strip()
    if color.startswith("#"):
        h = color[1:]
        if len(h) == 3:
            h = "".join(c * 2 for c in h)
        return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
    return tuple(int(n) for n in re.findall(r"\d+", color))


def distance(a, b) -> float:
    rmean = (a[0] + b[0]) / 2
    dr, dg, db = (a[i] - b[i] for i in range(3))
    return math.sqrt((2 + rmean / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rmean) / 256) * db * db)


def used_colors():
    used = []
    css = CSS.read_text(encoding="utf-8")
    for name, color in re.findall(r"\.accent(\w+)\s*\{\s*--accent:\s*" + COLOR_RE, css):
        used.append((f"home tile: {name}", color))
    default = re.search(r"\.tile\s*\{[^}]*--accent:\s*" + COLOR_RE, css)
    if default:
        used.append(("home tile: default / Explore More", default.group(1)))

    lan = LAN_MAP.read_text(encoding="utf-8")
    block = re.search(r"GAME_COLORS\s*=\s*\{(.*?)\}", lan, re.S)
    if block:
        for name, color in re.findall(r"'([^']+)'\s*:\s*'" + COLOR_RE + "'", block.group(1)):
            used.append((f"LAN map: {name}", color))
    return used


def main() -> int:
    if len(sys.argv) != 2 or not re.fullmatch(HEX_RE, sys.argv[1].strip()):
        print('Usage: python check_color.py "#RRGGBB"')
        return 2

    new = parse(sys.argv[1])
    clashes = []
    for label, color in used_colors():
        d = distance(new, parse(color))
        if d < MIN_DISTANCE:
            clashes.append((d, label, color))

    luminance = 0.2126 * new[0] + 0.7152 * new[1] + 0.0722 * new[2]
    if luminance < 40:
        print("WARN: this color is very dark and may not stand out on the site's dark background")

    if clashes:
        print(f"FAIL: {sys.argv[1]} is too close to colors already in use:")
        for d, label, color in sorted(clashes):
            print(f"  - {label} ({color}), distance {d:.0f} (needs {MIN_DISTANCE}+)")
        return 1

    print(f"OK: {sys.argv[1]} is distinct from every game color in use")
    return 0


if __name__ == "__main__":
    sys.exit(main())
