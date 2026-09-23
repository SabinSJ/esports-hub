import Image from 'next/image';

interface Props {
  logoUrl: string;
  size?: number;
}

export default function TeamLogo({ logoUrl, size = 40 }: Props) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Image src={logoUrl} width={size} height={size} alt="Team logo" />
    </div>
  );
}
