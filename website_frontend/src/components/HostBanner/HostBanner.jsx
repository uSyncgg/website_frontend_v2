import BannerImage from "components/BannerImage/BannerImage";
import BannerRegion from "components/BannerRegion/BannerRegion";
import BannerTitle from "components/BannerTitle/BannerTitle";
import MoreInfoButton from "components/MoreInfoButton/MoreInfoButton";
import React from "react";

import styles from './HostBanner.module.css';

const parts = [BannerImage, BannerRegion, BannerTitle, MoreInfoButton];

export const HostBanner = ({ children }) => {
    const hasContent = React.Children.toArray(children).some(
        (child) => React.isValidElement(child) && parts.includes(child.type)
    );

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