import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'

const BuildContext = createContext(null)

// Clave para localStorage
const BUILD_STORAGE_KEY = 'monte_crypto_build'

// Función para obtener el build guardado
const getStoredBuild = () => {
  if (typeof window === 'undefined') return {}
  try {
    const stored = localStorage.getItem(BUILD_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error al cargar el armado desde localStorage:', error)
    return {}
  }
}

export const BuildProvider = ({ children }) => {
  // build stored by tipo: { CPU: item, Motherboard: item, RAM: item, ... }
  const [build, setBuild] = useState(getStoredBuild)

  // Guardar en localStorage cuando cambie el build
  useEffect(() => {
    try {
      localStorage.setItem(BUILD_STORAGE_KEY, JSON.stringify(build))
    } catch (error) {
      console.error('Error al guardar el armado en localStorage:', error)
    }
  }, [build])

  const addPart = (item) => {
    if (!item || !item.tipo) return
    setBuild((prev) => ({ ...prev, [item.tipo]: item }))
  }

  const removePart = (tipo) => {
    setBuild((prev) => {
      const next = { ...prev }
      delete next[tipo]
      return next
    })
  }

  const clearBuild = () => {
    try {
      localStorage.removeItem(BUILD_STORAGE_KEY)
      setBuild({})
    } catch (error) {
      console.error('Error al limpiar el armado:', error)
    }
  }

  const total = useMemo(() => {
    return Object.values(build).reduce((acc, item) => acc + (Number(item.precio) || 0), 0)
  }, [build])

  const value = useMemo(() => ({ build, addPart, removePart, clearBuild, total }), [build, total])

  return <BuildContext.Provider value={value}>{children}</BuildContext.Provider>
}

export const useBuild = () => {
  const ctx = useContext(BuildContext)
  if (!ctx) throw new Error('useBuild must be used within a BuildProvider')
  return ctx
}
