import { Link, type To } from 'react-router-dom';
import stylesObj from './LegalNotice.module.css';
import { Fragment, type ComponentPropsWithRef } from 'react';

interface LegalNoticeProps extends Omit<ComponentPropsWithRef<'p'>, 'style' | 'children'> {
  prefix: string;
  links: {
    title: string;
    route: To;
  }[]
}

const LegalNotice = ({ prefix, links }: LegalNoticeProps) => {
  return <p className={stylesObj.legalNotice}>
    {prefix} {
      links.map((link, i) => (<Fragment key={i}>
        <Link to={link.route}>{link.title}{' '}</Link>
        {i === links.length - 2 && ' and '}
        {i < links.length - 2 && ', '}
      </Fragment>
      ))
    }
  </p>
}

export default LegalNotice;
