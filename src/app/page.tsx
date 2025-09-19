import TopNavBar from '@/components/top-nav-bar';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-background">
      <div
        className="absolute inset-0 bg-repeat"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      ></div>
      <div className="relative z-10 p-4">
        <TopNavBar />
      </div>
    </div>
  );
}
