'use client';

interface PageHeaderProps {
    title: string;
    description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
    return (
        <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-4xl mx-auto animate-fade-in">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline mt-4 mb-4 sm:mb-6">
                        {title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PageHeader;
