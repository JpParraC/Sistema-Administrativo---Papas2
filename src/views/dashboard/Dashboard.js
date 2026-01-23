import React, { useState, useEffect } from 'react'
import {
  CRow, CCol, CCard, CCardBody, CCardHeader, CBadge,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CProgress, CWidgetStatsA, CWidgetStatsC
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilCart,
  cilFactory,
  cilPeople,
  cilClipboard,
  cilCalendar,
  cilArrowBottom,
} from '@coreui/icons'

const cardStyle = {
  backdropFilter: 'blur(16px)',
  background: 'rgba(255,255,255,0.95)',
  borderRadius: 24,
  boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
  border: '1px solid rgba(255,255,255,1)',
}

const Dashboard = () => {
  const [resumen, setResumen] = useState({
    totalVentas: 0,
    totalCompras: 0,
    totalClientes: 0,
    totalPersonal: 0,
    totalInventario: 0,
    totalProduccion: 0,
    balance: 0,
    ventasHoy: 0,
    comprasHoy: 0,
  })

  const [ventasRecientes, setVentasRecientes] = useState([])
  const [comprasRecientes, setComprasRecientes] = useState([])
  const [inventarioBajo, setInventarioBajo] = useState([])
  const [produccionActiva, setProduccionActiva] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/dashboard')
        if (!response.ok) throw new Error('Error al cargar datos del dashboard')
        const data = await response.json()

        // Resumen
        setResumen({
          totalVentas: Number(data.resumen.totalVentas),
          totalCompras: Number(data.resumen.totalCompras),
          totalClientes: data.resumen.totalClientes,
          totalPersonal: data.resumen.totalPersonal,
          totalInventario: Number(data.resumen.totalInventario),
          totalProduccion: data.resumen.totalProduccion,
          balance: Number(data.resumen.balance),
          ventasHoy: Number(data.resumen.ventasHoy),
          comprasHoy: Number(data.resumen.comprasHoy),
        })

        // Ventas recientes
        setVentasRecientes(data.ventasRecientes.map(v => ({
          id: v.tb_idventa,
          cliente: v.cliente,
          fecha: new Date(v.fecha).toLocaleDateString(),
          total: Number(v.total),
          estado: v.estado === 'Pagada' ? 'Completada' : v.estado
        })))

        // Compras recientes
        setComprasRecientes(data.comprasRecientes.map(c => ({
          id: c.tb_idcompra,
          proveedor: c.proveedor,
          fecha: new Date(c.fecha).toLocaleDateString(),
          total: Number(c.total),
          estado: c.estado === 'PAGADA' ? 'Pagada' : c.estado
        })))

        // Inventario bajo
        setInventarioBajo(data.inventarioBajo.map(i => ({
          id: i.id,
          producto: i.producto,
          cantidad: Number(i.cantidad)
        })))

        // Por ahora vacíos
        setProduccionActiva([])
      } catch (err) {
        console.error('Error cargando dashboard:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) return <div>Cargando dashboard...</div>

  return (
    <div>
      {/* Widgets principales */}
      <CRow className="mb-4">
        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsA
            color="primary"
            value={<>{`$${resumen.totalVentas.toLocaleString()}`}<span className="fs-6 fw-normal ms-2">Ventas</span></>}
            title="Total Ventas"
            icon={<CIcon icon={cilCart} height={36} />}
            chart={<CProgress thin color="primary" value={80} />}
          />
        </CCol>
        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsA
            color="success"
            value={<>{`$${resumen.totalCompras.toLocaleString()}`}<span className="fs-6 fw-normal ms-2">Compras</span></>}
            title="Total Compras"
            icon={<CIcon icon={cilFactory} height={36} />}
            chart={<CProgress thin color="success" value={60} />}
          />
        </CCol>
        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsA
            color="info"
            value={<>{resumen.totalClientes}<span className="fs-6 fw-normal ms-2">Clientes</span></>}
            title="Clientes Registrados"
            icon={<CIcon icon={cilPeople} height={36} />}
            chart={<CProgress thin color="info" value={40} />}
          />
        </CCol>
        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsA
            color="warning"
            value={<>{resumen.totalPersonal}<span className="fs-6 fw-normal ms-2">Personal</span></>}
            title="Personal Activo"
            icon={<CIcon icon={cilUser} height={36} />}
            chart={<CProgress thin color="warning" value={30} />}
          />
        </CCol>
      </CRow>

      {/* Widgets secundarios */}
      <CRow className="mb-4">
        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsC
            color="secondary"
            icon={<CIcon icon={cilClipboard} height={36} />}
            value={resumen.totalInventario}
            title="Inventario Total"
          />
        </CCol>
        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsC
            color="info"
            icon={<CIcon icon={cilCalendar} height={36} />}
            value={resumen.totalProduccion}
            title="Producciones Activas"
          />
        </CCol>
        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsC
            color="success"
            icon={<CIcon icon={cilArrowBottom} height={36} />}
            value={`$${resumen.balance.toLocaleString()}`}
            title="Balance Actual"
          />
        </CCol>
        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsC
            color="danger"
            icon={<CIcon icon={cilArrowBottom} height={36} />}
            value={`$${resumen.comprasHoy.toLocaleString()}`}
            title="Compras Hoy"
          />
        </CCol>
      </CRow>

      {/* Ventas recientes */}
      <CRow>
        <CCol md={6} className="mb-4">
          <CCard style={cardStyle}>
            <CCardHeader className="fw-bold">Ventas Recientes</CCardHeader>
            <CCardBody>
              <CTable hover responsive align="middle">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Cliente</CTableHeaderCell>
                    <CTableHeaderCell>Fecha</CTableHeaderCell>
                    <CTableHeaderCell>Total</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {ventasRecientes.map(v => (
                    <CTableRow key={v.id}>
                      <CTableDataCell>{v.id}</CTableDataCell>
                      <CTableDataCell>{v.cliente}</CTableDataCell>
                      <CTableDataCell>{v.fecha}</CTableDataCell>
                      <CTableDataCell>${v.total.toLocaleString()}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={v.estado === 'Completada' ? 'success' : 'warning'}>
                          {v.estado}
                        </CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Compras recientes */}
        <CCol md={6} className="mb-4">
          <CCard style={cardStyle}>
            <CCardHeader className="fw-bold">Compras Recientes</CCardHeader>
            <CCardBody>
              <CTable hover responsive align="middle">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Proveedor</CTableHeaderCell>
                    <CTableHeaderCell>Fecha</CTableHeaderCell>
                    <CTableHeaderCell>Total</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {comprasRecientes.map(c => (
                    <CTableRow key={c.id}>
                      <CTableDataCell>{c.id}</CTableDataCell>
                      <CTableDataCell>{c.proveedor}</CTableDataCell>
                      <CTableDataCell>{c.fecha}</CTableDataCell>
                      <CTableDataCell>${c.total.toLocaleString()}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={c.estado === 'Pagada' ? 'success' : 'warning'}>
                          {c.estado}
                        </CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Inventario bajo */}
      <CRow>
        <CCol md={6} className="mb-4">
          <CCard style={cardStyle}>
            <CCardHeader className="fw-bold">Inventario Bajo</CCardHeader>
            <CCardBody>
              <CTable hover responsive align="middle">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Producto</CTableHeaderCell>
                    <CTableHeaderCell>Cantidad</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {inventarioBajo.map(i => (
                    <CTableRow key={i.id}>
                      <CTableDataCell>{i.producto}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={i.cantidad <= 0 ? 'danger' : 'warning'}>
                          {i.cantidad}
                        </CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Dashboard
