import LandingPageV1_PageFooter from '~/components/landing-page/page-footer';
import { LandingPageV1_SectionFive } from '~/components/landing-page/section-five';
import { LandingPageV1_SectionFour } from '~/components/landing-page/section-four';
import { LandingPageV1_SectionOne } from '~/components/landing-page/section-one';
import LandingPageV1_SectionSix from '~/components/landing-page/section-six';
import { LandingPageV1_SectionThree } from '~/components/landing-page/section-three';
import { LandingPageV1_SectionTwo } from '~/components/landing-page/section-two';
import type { Route } from './+types/management-table._index';

export function meta(args: Route.MetaArgs) {
  return [
    { title: 'Online Products Selling App' },
    {
      name: 'description',
      content: 'Coloca una descripción útil para las búsquedas de Google',
    },
  ];
}

export default function Home() {
  return (
    <>
      <main className="grid w-full">
        <LandingPageV1_SectionOne />
        <LandingPageV1_SectionTwo />
        <LandingPageV1_SectionThree />
        <LandingPageV1_SectionFour />
        <LandingPageV1_SectionFive />
        <LandingPageV1_SectionSix />
      </main>
      <LandingPageV1_PageFooter />
    </>
  );
}
