import classNames from 'classnames/bind';
import styles from './TechnicalSpecification.module.scss';
function TechnicalSpecification(data) {
    console.log(data);
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('mainTitle')}>Technical Specifications</p>
            <hr style={{ margin: 0 }} />
            <table className={cx('table')}>
                <tbody>
                    {data.data !== null &&
                        Object.keys(data.data).map((key, index) => (
                            <tr key={index}>
                                <td
                                    style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f1f1f1' }}
                                    className={cx('title')}
                                >
                                    {key}
                                </td>
                                <td
                                    style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f1f1f1' }}
                                    className={cx('content')}
                                >
                                    {data.data[key]}
                                </td>
                            </tr>
                        ))}
                    {data.data === null && (
                        <tr>
                            <td>No data available for this product</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TechnicalSpecification;
