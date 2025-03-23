const baseURL = process.env.NEXT_PUBLIC_API_URL

interface ApiResponse<T> {
	data?: T
	error?: string
}

const defaultHeaders = {
	'Content-Type': 'application/json',
}

export async function httpGet<T>(url: string): Promise<T> {
	try {
		const response = await fetch(normalizarUrl(`${baseURL}/${url}`), {
			method: 'GET',
			headers: defaultHeaders,
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error fetching data:', error)
		throw error
	}
}

function normalizarUrl(url: string) {
	const protocolo = url.split("://")[0]
	const restante = url.split("://")[1]
	return `${protocolo}://${restante.replaceAll(/\/{2,}/g, "/")}`
}
