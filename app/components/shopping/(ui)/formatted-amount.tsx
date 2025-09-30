export function FormattedAmount({
  featureName,
  unitAmount,
  bold = false,
  color = '',
}: any) {
  const ftGrid = {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: '65% 30%',
    paddingTop: '0.35rem',
    paddingBottom: '0.35rem',
    paddingLeft: '7%',
  };

  return (
    <div style={ftGrid}>
      <span
        style={{
          color: `${color.length > 0 ? color : 'inherit'}`,
          fontWeight: `${bold ? '600' : 'inherit'}`,
        }}>
        {featureName}
      </span>
      <span
        style={{
          color: `${color.length > 0 ? color : 'inherit'}`,
          fontWeight: `${bold ? '600' : 'inherit'}`,
        }}>
        {unitAmount}
      </span>
    </div>
  );
}
