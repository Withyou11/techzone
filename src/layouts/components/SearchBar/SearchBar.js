import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SearchBar({ onSearch }) {
    const cx = classNames.bind(styles);
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className={cx('wrapper')}>
            <input
                className={cx('inputSearch')}
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="What do you need..."
            />
            <button className={cx('searchButton')} onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}

export default SearchBar;
