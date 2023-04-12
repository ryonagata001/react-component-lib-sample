import React from 'react';

import Button from './Button';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: "ReactComponentLibrary/Button", // directory pathだと考えれば良い
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        bgColor: { control: 'color' },
    }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HelloWorld: Story = {
    args: {
        label: "Hello world!",
    }
}

export const ClickMe: Story = {
    args: {
        label: "Click me!",
    }
}
