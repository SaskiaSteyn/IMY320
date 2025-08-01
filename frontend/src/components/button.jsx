import { Link } from 'react-router-dom';

const Button = ({
    text,
    href,
    textColor = 'black',
    className = '',
    onClick,
}) => {
    const buttonClasses = `cta-button inline-block px-8 py-3 rounded-lg transition-colors font-semibold ${className}`;
    const textColorClass = `text-${textColor}`;
    const fullClasses = `${buttonClasses} ${textColorClass}`;

    // If href is provided, render as Link, otherwise as button
    if (href) {
        return (
            <Link to={href} className={fullClasses}>
                {text}
            </Link>
        );
    }

    return (
        <button className={fullClasses} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
