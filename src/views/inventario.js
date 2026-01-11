import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CBadge
} from '@coreui/react'

const Inventario = () => {
  const [inventario, setInventario] = useState([])

  // Cargar inventario al montar componente
  useEffect(() => {
    fetch('http://localhost:4000/api/inventario') // usar URL completa para evitar problemas de puerto
      .then(res => res.json())
      .then(data => {
        console.log('Datos recibidos del API:', data)
        // Normalizar datos
        const inventarioNormalizado = (Array.isArray(data) ? data : []).map((i, index) => ({
          id: i.producto_id || index,
          producto: i.producto || '-',
          cantidad_disponible: Number(i.cantidad_disponible || 0),
          fecha_ultima_actualizacion: i.fecha_ultima_actualizacion || '-'
        }))
        setInventario(inventarioNormalizado)
      })
      .catch(err => console.error('Error cargando inventario:', err))
  }, [])

  // Estilo centrado para celdas
  const cellStyle = { textAlign: 'center', verticalAlign: 'middle' }

  return (
    <CCard style={{ borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
      <CCardHeader style={{ background: '#fc8f46ff', color: '#fff', textAlign: 'center', fontWeight: 600 }}>
        <h5 className="mb-0" style={{ letterSpacing: 1 }}>Inventario</h5>
      </CCardHeader>
      <CCardBody>
        <CTable hover responsive bordered align="middle" className="shadow-sm" style={{ background: '#fff', borderRadius: 8 }}>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell style={cellStyle}>#</CTableHeaderCell>
              <CTableHeaderCell style={cellStyle}>Producto</CTableHeaderCell>
              <CTableHeaderCell style={cellStyle}>Cantidad Disponible</CTableHeaderCell>
              <CTableHeaderCell style={cellStyle}>Última Actualización</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {inventario.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan={4} style={cellStyle} className="text-muted">
                  No hay registros de inventario.
                </CTableDataCell>
              </CTableRow>
            ) : inventario.map((item, index) => (
              <CTableRow key={item.id}>
                <CTableHeaderCell style={cellStyle}>{index + 1}</CTableHeaderCell>
                <CTableDataCell style={cellStyle}>
                  <CBadge color="info" style={{ fontSize: 13, background: '#ED6A5A', color: '#fff', padding: '5px 12px' }}>
                    {item.producto}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell style={cellStyle}>{item.cantidad_disponible}</CTableDataCell>
                <CTableDataCell style={cellStyle}>
                  {item.fecha_ultima_actualizacion !== '-' 
                    ? item.fecha_ultima_actualizacion.slice(0, 16).replace('T', ' ')
                    : '-'}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Inventario
