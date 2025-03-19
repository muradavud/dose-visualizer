import Image from 'next/image';

type ButtonVariant = 'banana' | 'camera';

interface RoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isActive?: boolean;
  className?: string;
}

export function RoundButton({ 
  variant = 'banana',
  isActive = false, 
  className = '', 
  ...props 
}: RoundButtonProps) {
  // Set image and color based on variant
  const imageSrc = variant === 'banana' 
    ? '/assets/ui/banana.svg'
    : '/assets/ui/camera.svg';
  
  const altText = variant === 'banana' ? 'Banana icon' : 'Camera reset icon';
  
  const activeBackgroundColor = variant === 'banana' 
    ? 'bg-yellow-100 border-yellow-400' 
    : 'bg-green-100 border-green-400';
    
  return (
    <button 
      className={`w-12 h-12 p-3 rounded-full border shadow-lg transition-colors 
        ${isActive 
          ? activeBackgroundColor
          : 'bg-white border-gray-300 hover:bg-gray-100 active:bg-gray-200'} 
        ${className}`}
      {...props}
    >
      <Image 
        src={imageSrc} 
        alt={altText} 
        width={24}
        height={24}
      />
    </button>
  );
}

// Keep BananaButton for backward compatibility
export function BananaButton(props: Omit<RoundButtonProps, 'variant'>) {
  return <RoundButton variant="banana" {...props} />;
} 