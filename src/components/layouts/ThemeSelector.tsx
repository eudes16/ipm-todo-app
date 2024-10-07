import { IconMoon, IconSun } from '@tabler/icons-react';
import { FC } from 'react';

interface ThemeSelectorProps {
    theme: 'light' | 'dark'
    onClick: () => void
}

const ThemeSelector: FC<ThemeSelectorProps> = (props) => {
  return (
    <div className='fixed right-4 top-4'>
        <div className='flex h-8 w-8 text-zinc-900 dark:text-zinc-100 cursor-pointer' 
            onClick={props.onClick}
        >
            {props.theme === 'light' ? <IconMoon />: <IconSun />}
        </div>
    </div>
  );
}

export default ThemeSelector;