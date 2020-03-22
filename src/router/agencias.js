//Tempalte de la vista
import Full from 'Container/Full'

const proximospagos = () => import('Views/agencias/inicio');

export default {
    path: '/',
    component: Full,
    redirect: '/agencias',
    children: [
        {
            component: proximospagos,
            path: '/agencias',
            meta: {
                requiresAuth: true,
                title: 'message.listaAgencias',
                breadcrumb: [
                    {
                        breadcrumbInactive: 'agencias /',
                    },
                    {
                        breadcrumbActive: 'inicio',

                    }
                ]
            }
        },

    ]
}
