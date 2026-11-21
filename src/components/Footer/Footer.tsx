import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <Image 
              src="/logo+.png" 
              alt="Infocod Logo" 
              width={150} 
              height={50}
              style={{ width: 'auto', height: 'auto' }}
              className={styles.logo}
            />
            <p className={styles.description}>
              Convertimos información en soluciones tecnológicas. Desarrollo de software corporativo y automatización para tu transformación digital.
            </p>
          </div>
          
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Servicios</h4>
            <ul className={styles.linkList}>
              <li><Link href="/servicios" className={styles.link}>Desarrollo de Sitios Web</Link></li>
              <li><Link href="/servicios" className={styles.link}>Desarrollo de Sistemas Web</Link></li>
              <li><Link href="/servicios" className={styles.link}>Apps Móviles</Link></li>
              <li><Link href="/servicios" className={styles.link}>Business Intelligence</Link></li>
              <li><Link href="/servicios" className={styles.link}>Inteligencia Artificial</Link></li>
              <li><Link href="/servicios" className={styles.link}>Automatización (RPA)</Link></li>
              <li><Link href="/servicios" className={styles.link}>Cloud y DevOps</Link></li>
              <li><Link href="/servicios" className={styles.link}>Consultoría IT</Link></li>
              <li><Link href="/servicios" className={styles.link}>SaaS</Link></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Productos</h4>
            <ul className={styles.linkList}>
              <li><Link href="/productos?p=agenda" className={styles.link}>Agenda+</Link></li>
              <li><Link href="/productos?p=masticod" className={styles.link}>Masticod</Link></li>
              <li><Link href="/productos?p=datapilot" className={styles.link}>DataPilot</Link></li>
              <li><Link href="/productos?p=cvforge" className={styles.link}>CVforge</Link></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Contacto</h4>
            <ul className={styles.linkList}>
              <li className={styles.contactItem}><a href="mailto:infocod.codes@gmail.com" className={styles.link}>infocod.codes@gmail.com</a></li>
              <li className={styles.contactItem}>+52 xx xxxx xxxx</li>
              <li className={styles.contactItem}>xxxx, xxxx</li>
              <li><Link href="/contacto" className={styles.link} style={{ color: 'var(--color-brand-green)', fontWeight: 'bold' }}>Cotiza tu proyecto &rarr;</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottomSection}>
          <p>&copy; {new Date().getFullYear()} Infocod. Todos los derechos reservados.</p>
          <div className={styles.socialLinks}>
            <Link 
              href="https://www.linkedin.com/company/infocodmx" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialIcon}
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} />
            </Link>
            <Link 
              href="https://www.facebook.com/profile.php?id=61596698644304" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialIcon}
              aria-label="Facebook"
            >
              <FacebookIcon size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
