import Image from 'next/image';

const InscripterLogo: React.FC<{ size: number }> = ({ size }) => {
  return (
    <div>
      <Image src="/logo120120nobg.png" alt="Logo" width={size} height={size} />
    </div>
  );
};

export default InscripterLogo;
