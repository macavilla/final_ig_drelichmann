/* eslint-disable @typescript-eslint/no-explicit-any */
// routes.ts
import fs from 'fs'
import path from 'path'

// Función recursiva para generar el objeto de rutas
function generateRoutes(
	dir: string,
	basePath: string = ''
): Record<string, any> {
	const routes: Record<string, any> = {}
	const items = fs.readdirSync(dir)

	items.forEach(item => {
		const itemPath = path.join(dir, item)
		const stat = fs.statSync(itemPath)

		if (stat.isDirectory()) {
			// Si es un directorio, llamamos recursivamente a la función
			routes[item] = generateRoutes(itemPath, `${basePath}/${item}`)
		} else if (stat.isFile() && item.endsWith('.astro')) {
			// Si es un archivo .astro, generamos la ruta
			const routeName = item.replace('.astro', '')
			routes[routeName] = `${basePath}/${routeName}`
		}
	})

	return routes
}

// Ruta base de tu carpeta /src/pages
const pagesDir = path.join(process.cwd(), 'src', 'pages')

// Generar el objeto de rutas
const routes = generateRoutes(pagesDir)

// Exportar el objeto de rutas
export default routes
