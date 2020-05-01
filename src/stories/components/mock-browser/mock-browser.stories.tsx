import * as React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import {
	MockBrowser,
	SetUrl,
	WithSetUrlProps,
} from '../../../components/mock-browser';
import { Fragment } from 'react';
import { Hidden } from '../../../index';

export default {
	title: 'MockBrowser',
	decorators: [withKnobs],
};

const linkStyle = { cursor: 'pointer', borderBottom: '1px solid' };

type WelcomePageProps = {
	setUrl: SetUrl;
	hasLinkToHome?: boolean;
	hasLinkToQuickAccessIntro?: boolean;
};

const WelcomePage = ({
	setUrl,
	hasLinkToHome,
	hasLinkToQuickAccessIntro,
}: WelcomePageProps) => (
	<div>
		<h2>Welcome</h2>
		<Hidden when={!hasLinkToHome}>
			<a
				style={linkStyle}
				onClick={(e): void => {
					e.preventDefault();
					setUrl('home');
				}}
			>
				Go to home
			</a>
		</Hidden>

		<Hidden when={!hasLinkToQuickAccessIntro}>
			<a
				style={linkStyle}
				onClick={(e): void => {
					e.preventDefault();
					setUrl('quick-access-intro');
				}}
			>
				Go to quick access intro
			</a>
		</Hidden>
	</div>
);

const HomePage = ({ setUrl }: WithSetUrlProps) => (
	<div>
		<h2>Home</h2>
		<a
			style={linkStyle}
			onClick={(e): void => {
				e.preventDefault();
				setUrl('welcome');
			}}
		>
			Go back to welcome
		</a>
	</div>
);

export const basic = () => {
	const BasicWelcomePage = ({ setUrl }: WithSetUrlProps) => (
		<WelcomePage hasLinkToHome setUrl={setUrl} />
	);
	return (
		<MockBrowser
			style={{ color: 'white' }}
			domain={text('domain', undefined)}
			initialUrl={text('initRoute', 'welcome')}
			Routes={[
				{
					url: 'welcome',
					component: BasicWelcomePage,
				},
				{ url: 'home', component: HomePage },
			]}
		/>
	);
};

const QuickAccess: React.FC<WithSetUrlProps> = ({
	setUrl,
}: WithSetUrlProps) => (
	<Fragment>
		<button onClick={(): void => setUrl('welcome')}>Go to welcome page</button>
		<button onClick={(): void => setUrl('quick-access-intro')}>
			Go to intro
		</button>
	</Fragment>
);

const IntroPage = () => (
	<div>
		<h2>Quick Access Introduction</h2>
		<p>This area is next to the url link. So you can add what ever you want</p>
	</div>
);

export const withQuickAccess = () => {
	const QuickAccessWelcomePage = ({ setUrl }: WithSetUrlProps) => (
		<WelcomePage hasLinkToQuickAccessIntro setUrl={setUrl} />
	);
	return (
		<MockBrowser
			style={{ color: 'white' }}
			domain={text('domain', undefined)}
			initialUrl={text('initRoute', 'welcome')}
			QuickAccess={QuickAccess}
			Routes={[
				{ url: 'welcome', component: QuickAccessWelcomePage },
				{ url: 'quick-access-intro', component: IntroPage },
			]}
		/>
	);
};
