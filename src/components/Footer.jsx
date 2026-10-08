const highlights = [
  { value: 'B.Tech', description: 'Computer Science & Eng' },
  { value: 'TCP/IP', description: 'Protocols & Subnetting' },
  { value: 'C/Python/Java', description: 'Core Software Stacks' },
  { value: 'Indian', description: 'Nationality · Male · 02/09/2005' },
];

export default function Footer() {
  return (
    <footer className="highlights">
      {highlights.map(({ value, description }) => (
        <div className="highlight" key={value}>
          <span className="highlight-value">{value}</span>
          <span className="highlight-description">{description}</span>
        </div>
      ))}
    </footer>
  );
}
