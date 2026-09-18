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
      <img
        src={logoUrl}
        width={100}
        height={100}
        style={{ backgroundColor: 'white' }}
        alt="logoImage"
      />
    </div>
  );
}
