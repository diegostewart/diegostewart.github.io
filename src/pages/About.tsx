import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@example.com");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-6 w-full">
        <section className="py-24">
          <h1 className="text-3xl font-semibold tracking-tighter mb-8">About</h1>

          <div className="prose mb-16">
            <p>
              I'm a Data Engineer focused on building reliable, scalable data infrastructure. 
              I spend most of my time designing pipelines, optimizing queries, and making sure 
              data gets where it needs to go — on time and intact.
            </p>
            <p>
              My work spans the full data stack: ingestion, transformation, orchestration, 
              and serving. I believe in treating data pipelines as software — tested, 
              version-controlled, and monitored.
            </p>
            <p>
              When I'm not writing SQL or Python, I write about the patterns and decisions 
              that make data systems work at scale.
            </p>
          </div>

          {/* Stack */}
          <div className="mb-16">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-6">
              Stack
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-8 text-sm">
              {[
                "Python", "SQL", "Apache Spark",
                "Apache Kafka", "dbt", "Airflow",
                "Dagster", "Snowflake", "PostgreSQL",
                "Terraform", "Docker", "AWS",
              ].map((tool) => (
                <span key={tool} className="text-foreground">{tool}</span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mb-16">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-6">
              Experience
            </h2>
            <div className="space-y-4 text-sm">
              {[
                { company: "Company A", role: "Senior Data Engineer", period: "2024–Present" },
                { company: "Company B", role: "Data Engineer", period: "2022–2024" },
                { company: "Company C", role: "Junior Data Engineer", period: "2020–2022" },
              ].map((exp) => (
                <div key={exp.company} className="flex items-baseline justify-between border-b border-border pb-3">
                  <div>
                    <span className="text-foreground font-medium">{exp.company}</span>
                    <span className="text-muted-foreground ml-3">{exp.role}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">{exp.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-6">
              Contact
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleCopyEmail}
                className="text-sm text-accent hover:text-foreground transition-colors duration-150 text-left"
              >
                Copy Email ↗
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:text-foreground transition-colors duration-150"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:text-foreground transition-colors duration-150"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
