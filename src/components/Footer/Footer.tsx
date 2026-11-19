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

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
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
              <li><Link href="/productos#agenda" className={styles.link}>Agenda+</Link></li>
              <li><Link href="/productos#masticod" className={styles.link}>Masticod</Link></li>
              <li><Link href="/productos#datapilot" className={styles.link}>DataPilot</Link></li>
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
            <Link href="#" className={styles.socialIcon}><LinkedinIcon size={20} /></Link>
            <Link href="#" className={styles.socialIcon}><TwitterIcon size={20} /></Link>
            <Link href="#" className={styles.socialIcon}><GithubIcon size={20} /></Link>
            <Link href="#" className={styles.socialIcon}><InstagramIcon size={20} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
