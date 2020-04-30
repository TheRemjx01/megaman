import * as React from 'react';
import { useState } from 'react';
import { Hidden } from '../../index';

export type Route = {
	url: string;
	component: any;
};

export type WithSetUrlProps = {
	setUrl: (url: string) => void;
};

type MockBrowserProps = {
	baseUrl?: string;
	initialUrl?: string;
	QuickAccess: React.FC<WithSetUrlProps>;
	style?: object;
	Routes: Route[];
};

export const MockBrowser = ({
	baseUrl = 'https://trmx01.demo.io/',
	initialUrl = '',
	QuickAccess,
	style,
	Routes,
}: MockBrowserProps) => {
	const [currentUrl, setUrl] = useState(initialUrl);
	return (
		<div style={style}>
			<div id="page-link">
				<span>
					<label>Url:</label>
					<input
						value={`${baseUrl}${currentUrl}`}
						style={{ minWidth: '400px' }}
						disabled
					/>
				</span>
				<QuickAccess setUrl={setUrl} />
			</div>

			<div id="page-content">
				<hr />
				{Routes.map(({ url, component: Component }) => (
					<Hidden when={currentUrl.indexOf(url) !== 0} key={url}>
						<Component setUrl={setUrl} />
					</Hidden>
				))}
			</div>
		</div>
	);
};
