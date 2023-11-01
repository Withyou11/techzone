import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ShortSidebar.module.scss';
import categories from '~/Statics/categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
    faBars,
    faCaretDown,
    faLaptop,
    faComputer,
    faMobileScreen,
    faTabletScreenButton,
    faTv,
    faComputerMouse,
    faKeyboard,
    faGamepad,
    faHeadphonesSimple,
    faHeadphones,
} from '@fortawesome/free-solid-svg-icons';
import { faSpeakerDeck } from '@fortawesome/free-brands-svg-icons';
function ShortSidebar() {
    const [isAllCategoryClicked, setAllCategoryClicked] = useState(false);

    const toggleCategoryList = () => {
        setAllCategoryClicked(!isAllCategoryClicked);
    };

    const cx = classNames.bind(styles);
    return (
        <aside className={cx('wrapper')}>
            <ul>
                <li className={cx('categoryItem1')} onClick={toggleCategoryList}>
                    <FontAwesomeIcon className={cx('barIcon')} icon={faBars}></FontAwesomeIcon>
                    <p className={cx('allCategory')}>All Categories</p>
                    <FontAwesomeIcon className={cx('barIcon')} icon={faCaretDown}></FontAwesomeIcon>
                </li>
                {categories.map((category) => (
                    <li key={category.id} className={cx('categoryItem', { hidden: isAllCategoryClicked })}>
                        <Link className={cx('link')} to={`/products/${category.name}`}>
                            {category.iconName === 'faLaptop' && (
                                <div className={cx('iconContainer')}>
                                    <FontAwesomeIcon className={cx('categoryIcon')} icon={faLaptop}></FontAwesomeIcon>
                                </div>
                            )}
                            {category.iconName === 'faComputer' && (
                                <div className={cx('iconContainer')}>
                                    <FontAwesomeIcon className={cx('categoryIcon')} icon={faComputer}></FontAwesomeIcon>
                                </div>
                            )}
                            {category.iconName === 'faComputerMouse' && (
                                <div className={cx('iconContainer')}>
                                    <FontAwesomeIcon
                                        className={cx('categoryIcon1')}
                                        icon={faComputerMouse}
                                    ></FontAwesomeIcon>
                                </div>
                            )}
                            {category.iconName === 'faMobileScreen' && (
                                <div className={cx('iconContainer')}>
                                    <FontAwesomeIcon
                                        className={cx('categoryIcon1')}
                                        icon={faMobileScreen}
                                    ></FontAwesomeIcon>
                                </div>
                            )}
                            {category.iconName === 'faTabletScreenButton' && (
                                <div className={cx('iconContainer')}>
                                    <FontAwesomeIcon
                                        className={cx('categoryIcon1')}
                                        icon={faTabletScreenButton}
                                    ></FontAwesomeIcon>
                                </div>
                            )}
                            {category.iconName === 'faTv' && (
                                <div className={cx('iconContainer')}>
                                    <FontAwesomeIcon className={cx('categoryIcon')} icon={faTv}></FontAwesomeIcon>
                                </div>
                            )}
                            {category.iconName === 'faKeyboard' && (
                                <div className={cx('iconContainer')}>
                                    <FontAwesomeIcon className={cx('categoryIcon')} icon={faKeyboard}></FontAwesomeIcon>
                                </div>
                            )}
                            {category.iconName === 'faHeadphonesSimple' && (
                                <div className={cx('iconContainer')}>
                                    <FontAwesomeIcon
                                        className={cx('categoryIcon1')}
                                        icon={faHeadphonesSimple}
                                    ></FontAwesomeIcon>
                                </div>
                            )}
                            {category.iconName === 'faHeadphones' && (
                                <div className={cx('iconContainer')}>
                                    <FontAwesomeIcon
                                        className={cx('categoryIcon1')}
                                        icon={faHeadphones}
                                    ></FontAwesomeIcon>
                                </div>
                            )}
                            {category.iconName === 'faGamepad' && (
                                <div className={cx('iconContainer')}>
                                    <FontAwesomeIcon className={cx('categoryIcon')} icon={faGamepad}></FontAwesomeIcon>
                                </div>
                            )}
                            {category.iconName === 'faSpeakerDeck' && (
                                <div className={cx('iconContainer')}>
                                    <FontAwesomeIcon
                                        className={cx('categoryIcon')}
                                        icon={faSpeakerDeck}
                                    ></FontAwesomeIcon>
                                </div>
                            )}
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default ShortSidebar;
