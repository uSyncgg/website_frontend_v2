import BannerImage from "components/BannerImage/BannerImage";
import BannerRegion from "components/BannerRegion/BannerRegion";
import BannerTitle from "components/BannerTitle/BannerTitle";
import MoreInfoButton from "components/MoreInfoButton/MoreInfoButton";

import styles from './HostBanner.module.css';

export const HostBanner = ({ children }) => {
    return (
        <div className={styles.banner}>
            {children}
        </div>
    );
}

HostBanner.Image = BannerImage;
HostBanner.Region = BannerRegion;
HostBanner.Title = BannerTitle;
HostBanner.Button = MoreInfoButton;