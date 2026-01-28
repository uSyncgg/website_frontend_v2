import styles from './BannerTitle.module.css';

function BannerTitle({path, children}) {
    return (
        <a href={path}>
            <h1>{children}</h1>
        </a>
    );
}

export default BannerTitle;