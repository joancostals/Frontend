/**
 * apiFetch.js
 * Utilitat per fer peticions al backend amb gestió automàtica de Refresh Token.
 */

const BASE_URL = "http://localhost:5000/api";

export async function apiFetch(endpoint, options = {}) {
    let accessToken = localStorage.getItem("accessToken");

    // Configurar headers per defecte
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    let url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;
    
    let response = await fetch(url, { ...options, headers });

    // Si rebem un 401 (Unauthorized), el token podria haver caducat
    if (response.status === 401) {
        console.warn("Access Token caducat, intentant fer refresh...");
        
        const refreshToken = localStorage.getItem("refreshToken");
        
        if (refreshToken) {
            // Intentar renovar el token cridant a l'endpoint de refresh
            const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken })
            });

            if (refreshRes.ok) {
                const data = await refreshRes.json();
                
                // Guardar els nous tokens (ROTACIÓ)
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                
                console.log("Tokens renovats correctament!");

                // Reintentar la petició original amb el nou token
                headers["Authorization"] = `Bearer ${data.accessToken}`;
                response = await fetch(url, { ...options, headers });
            } else {
                // Si el refresh també falla, tanquem la sessió
                console.error("No s'ha pogut renovar el token. Redirigint a Login...");
                handleLogout();
            }
        } else {
            handleLogout();
        }
    }

    return response;
}

function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.setItem("logged", "false");
    window.location.href = "/login";
}
