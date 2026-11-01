import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormTextArea } from "components/FormTextArea/FormTextArea";
import { FormPFPUpload } from "components/FormPFPUpload/FormPFPUpload";
import { useCurrentUser } from "hooks";
import { getProfile } from "services/user";
import { PROFILE_LABELS, bioField, copyBioField, copyPictureField, pictureField } from "utils/profiles";
import styles from "./ProfileMediaStep.module.css";

// One profile's photo and bio. A profile that isn't the default gets "same as my default"
// boxes: the photo one above the upload (once the default has a photo), the bio one below the
// bio. Ticking one hides that input and the default's photo or bio is used instead.
const ProfileMedia = ({ type, heading, isDefault, defaultLabel, defaultPicture, defaultBio }) => {
    const { register } = useFormContext();
    const copyPicture = useWatch({ name: copyPictureField(type) });
    const copyBio = useWatch({ name: copyBioField(type) });

    return (
        <section className={styles.profileSection}>
            {heading &&
                <h3 className={styles.profileHeading}>
                    {heading}
                    {isDefault && <span className={styles.badge}>Default</span>}
                </h3>
            }

            {!isDefault && defaultPicture &&
                <label className={styles.option}>
                    <input type="checkbox" {...register(copyPictureField(type))} />
                    {typeof defaultPicture === 'string' && <img src={defaultPicture} alt="" className={styles.thumb} />}
                    Use the same photo as my {defaultLabel} profile
                </label>
            }
            {!(copyPicture && defaultPicture) &&
                <FormPFPUpload
                    id={pictureField(type)}
                    name={pictureField(type)}
                    label={"Upload a Profile Picture"}
                    required={false}
                    inputClassName={""}
                    labelClassName={""}
                    errorClassName={""}
                />
            }

            {copyBio
                ? <div className={styles.reusedBio}>
                    <span className={styles.reusedLabel}>Short Bio</span>
                    <p className={styles.reused}>{defaultBio || `Your ${defaultLabel} profile doesn't have a bio yet.`}</p>
                </div>
                : <FormTextArea
                    id={bioField(type)}
                    name={bioField(type)}
                    required={false}
                    label={"Short Bio"}
                    maxLength={500}
                    disabled={false}
                    labelClassName={""}
                    errorClassName={""}
                    inputClassName={""}
                    counterClassName={""}
                />
            }

            {/* Always shown (at the bottom, so nothing above it moves) for every profile but the
                default. Disabled until the default has a bio, but never while ticked, so it can
                always be unticked. */}
            {!isDefault &&
                <label className={`${styles.option} ${styles.optionBelow}`}>
                    <input type="checkbox" disabled={!defaultBio && !copyBio} {...register(copyBioField(type))} />
                    Use the same bio as my {defaultLabel} profile
                    {!defaultBio && !copyBio && <span className={styles.hint}>(write one there first)</span>}
                </label>
            }
        </section>
    );
};

// Sign-up: a section per profile being created, the default first. The other profiles can
// reuse the default's photo (once one is picked) and bio (once one is written).
const SignUpMedia = ({ types }) => {
    const defaultType = useWatch({ name: "default_profile" });
    const def = types.includes(defaultType) ? defaultType : types[0];
    const defaultPicked = useWatch({ name: pictureField(def) })?.length > 0;
    const defaultBio = (useWatch({ name: bioField(def) }) ?? "").trim();
    const ordered = [def, ...types.filter(type => type !== def)];
    const multiple = types.length > 1;

    return <>{ordered.map(type => (
        <ProfileMedia
            key={type}
            type={type}
            heading={multiple ? `${PROFILE_LABELS[type]} profile` : null}
            isDefault={type === def}
            defaultLabel={PROFILE_LABELS[def].toLowerCase()}
            defaultPicture={defaultPicked}
            defaultBio={defaultBio}
        />
    ))}</>;
};

// Adding a profile: its own photo and bio, or the account's default profile's. The default's
// bio isn't in /me, so it's read from its public profile and kept in the form as `default_bio`.
const AddProfileMedia = ({ type }) => {
    const { defaultProfile } = useCurrentUser();
    const { setValue } = useFormContext();
    const defaultBio = useWatch({ name: "default_bio" }) ?? "";
    const publicId = defaultProfile?.public_id;

    useEffect(() => {
        if (!publicId) return;
        let cancelled = false;
        getProfile(publicId)
            .then(profile => { if (!cancelled) setValue("default_bio", profile.bio ?? ""); })
            // Without it the user just writes their own bio.
            .catch(() => {});
        return () => { cancelled = true; };
    }, [publicId, setValue]);

    return (
        <ProfileMedia
            type={type}
            heading={null}
            isDefault={false}
            defaultLabel={defaultProfile ? PROFILE_LABELS[defaultProfile.type].toLowerCase() : "default"}
            defaultPicture={defaultProfile?.profile_picture ?? null}
            defaultBio={defaultBio.trim()}
        />
    );
};

export const ProfileMediaStep = ({ types, isSignUp }) =>
    isSignUp ? <SignUpMedia types={types} /> : <AddProfileMedia type={types[0]} />;
