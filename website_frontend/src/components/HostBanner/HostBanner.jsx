import BannerImage from "components/BannerImage/BannerImage";
import BannerRegion from "components/BannerRegion/BannerRegion";
import BannerTitle from "components/BannerTitle/BannerTitle";
import MoreInfoButton from "components/MoreInfoButton/MoreInfoButton";
import React from "react";
import { useNavigate } from "react-router";

import styles from './HostBanner.module.css';

export const HostBanner = ({ children, path }) => {
    const navigate = useNavigate();

    const goToPath = () => {
        if (path) navigate(path);
    };

    const handleKeyDown = (e) => {
        if (path && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            navigate(path);
        }
    };

    return (
        <div
            className={styles.banner}
            onClick={path ? goToPath : undefined}
            onKeyDown={path ? handleKeyDown : undefined}
            role={path ? 'link' : undefined}
            tabIndex={path ? 0 : undefined}
            style={path ? { cursor: 'pointer' } : undefined}
        >
            {children}
        </div>
    );
}

HostBanner.Image = BannerImage;
HostBanner.Region = BannerRegion;
HostBanner.Title = BannerTitle;
HostBanner.Button = MoreInfoButton;
