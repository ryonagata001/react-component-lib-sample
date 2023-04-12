import React from 'react';

export interface ButtonProps {
    /**
     * Button contents
     * @default Hello world!
     */
    label?: string;
    /**
     * ボタンの背景色
     * @default ffffff
     */
    bgColor?: string;
    /**
     * クリックした時に呼ばれる関数
     * @returns
     */
    onClick?: () => void;
    
}

const Button = ({
    label = 'Hello world!',
    bgColor = '#ffffff',
    ...props
}: ButtonProps) => {
    return (
        <button 
            className={[
                'border-none',
            ].join('')}
            style={{ backgroundColor: bgColor }}
            onClick={props.onClick}
        >
            {label}
        </button>
    )
}

export default Button;