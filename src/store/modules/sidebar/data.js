// Sidebar Routers
export const menus = {
	'message.general': [
		{
			action: 'zmdi-view-dashboard',
			title: 'message.dashboard',
			active: false,
			label: 'New',
			items: [
				{ title: 'message.ecommerce', path: '/default/dashboard/ecommerce', exact: true,label: 'Old' },
				{ title: 'message.crm', path: '/default/dashboard/crm',label: 'New', exact: true},
				{ title: 'message.crypto', path: '/mini/dashboard/crypto',label: 'New', exact: true},
				{ title: 'message.webAnalytics', path: '/mini/dashboard/web-analytics', exact: true,label: 'Old' },
				{ title: 'message.magazine', path: '/horizontal/dashboard/magazine', exact: true,label: 'Old' },
				{ title: 'message.news', path: '/boxed-v2/dashboard/news', exact: true,label: 'Old' },
				{ title: 'message.agency', path: '/boxed/dashboard/agency', exact: true,label: 'Old' },
				{ title: 'message.saas', path: '/horizontal/dashboard/saas', exact: true,label: 'Old' }
			]
		}
		],
	'message.bodasygrupos': [
		{
			action: 'zmdi-crop',
			title: 'message.gruposYbodas',
			active: false,
			items: null,
			path: '/bodasygrupos',
			label:'Old'
		},
		{
			action: 'zmdi-crop',
			title: 'message.proximosPagos',
			active: false,
			items: null,
			path: '/image-cropper',
			label:'Old'
		},	
		{
			action: 'zmdi-crop',
			title: 'message.agencias',
			active: false,
			items: null,
			path: '/image-cropper',
			label:'Old'
		},	
		{
			action: 'zmdi-crop',
			title: 'message.notifications',
			active: false,
			items: null,
			path: '/image-cropper',
			label:'Old'
		}			
	]
}
