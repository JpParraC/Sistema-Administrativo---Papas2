
import React, { useState } from 'react'
import {
  CRow, CCol, CCard, CCardBody, CCardHeader, CButton, CBadge,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CProgress, CWidgetStatsA, CWidgetStatsC
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilMoney,
  cilCart,
  cilChartLine,
  cilFactory,
  cilPeople,
  cilClipboard,
  cilCalendar,
  cilArrowBottom, // reemplazo de cilTrendingDown
} from '@coreui/icons'

const Dashboard = () => {
  // Simulación de datos resumen
  const resumen = {
    totalVentas: 37200,
    totalCompras: 21500,
    totalClientes: 22,
    totalPersonal: 8,
    totalInventario: 3950,
    totalProduccion: 4,
    balance: 15700,
    ventasHoy: 1200,
    comprasHoy: 800,
  }

  // Simulación de ventas recientes
  const ventasRecientes = [
    { id: 1, cliente: 'Carlos Ramírez', fecha: '2025-07-08', total: 1200, estado: 'Completada' },
    { id: 2, cliente: 'María López', fecha: '2025-07-08', total: 800, estado: 'Pendiente' },
    { id: 3, cliente: 'Cliente Tres', fecha: '2025-07-07', total: 950, estado: 'Completada' },
  ]

  // Simulación de compras recientes
  const comprasRecientes = [
    { id: 1, proveedor: 'AgroFert', fecha: '2025-07-08', total: 600, estado: 'Pagada' },
    { id: 2, proveedor: 'Semillas S.A.', fecha: '2025-07-07', total: 1200, estado: 'Pendiente' },
  ]

  // Simulación de inventario bajo
  const inventarioBajo = [
    { id: 1, producto: 'Papa Negra', cantidad: 120 },
    { id: 2, producto: 'Papa Blanca', cantidad: 80 },
  ]

  // Simulación de producción activa
  const produccionActiva = [
    { id: 1, producto: 'Papa Negra', fecha_siembra: '2025-05-01', fecha_cosecha: '2025-08-01', responsable: 'Juan Pérez' },
    { id: 2, producto: 'Papa Blanca', fecha_siembra: '2025-06-10', fecha_cosecha: '2025-09-10', responsable: 'Ana Gómez' },
  ]

  // Simulación de balance mensual
  const balanceMensual = [
    { mes: 'Enero', ingresos: 8000, egresos: 5000 },
    { mes: 'Febrero', ingresos: 9000, egresos: 6000 },
    { mes: 'Marzo', ingresos: 11000, egresos: 7000 },
    { mes: 'Abril', ingresos: 12000, egresos: 8000 },
    { mes: 'Mayo', ingresos: 9500, egresos: 6500 },
    { mes: 'Junio', ingresos: 10500, egresos: 7000 },
    { mes: 'Julio', ingresos: 12000, egresos: 8000 },
  ]

  return (
    <div>
      <CRow className="mb-4">
        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsA
            className="mb-3"
            color="primary"
            value={<>
              ${resumen.totalVentas.toLocaleString()}
              <span className="fs-6 fw-normal ms-2">Ventas</span>
            </>}
            title="Total Ventas"
            icon={<CIcon icon={cilCart} height={36} />}
            chart={<CProgress thin color="primary" value={80} />}
          />
        </CCol>
        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsA
            className="mb-3"
            color="success"
            value={<>
              ${resumen.totalCompras.toLocaleString()}
              <span className="fs-6 fw-normal ms-2">Compras</span>
            </>}
            title="Total Compras"
            icon={<CIcon icon={cilFactory} height={36} />}
            chart={<CProgress thin color="success" value={60} />}
          />
        </CCol>
        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsA
            className="mb-3"
            color="info"
            value={<>
              {resumen.totalClientes}
              <span className="fs-6 fw-normal ms-2">Clientes</span>
            </>}
            title="Clientes Registrados"
            icon={<CIcon icon={cilPeople} height={36} />}
            chart={<CProgress thin color="info" value={40} />}
          />
        </CCol>
        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsA
            className="mb-3"
            color="warning"
            value={<>
              {resumen.totalPersonal}
              <span className="fs-6 fw-normal ms-2">Personal</span>
            </>}
            title="Personal Activo"
            icon={<CIcon icon={cilUser} height={36} />}
            chart={<CProgress thin color="warning" value={30} />}
          />
        </CCol>
      </CRow>

      <CRow className="mb-4">
        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsC
            className="mb-3"
            color="secondary"
            icon={<CIcon icon={cilClipboard} height={36} />}
            value={resumen.totalInventario}
            title="Inventario Total"
          />
        </CCol>
        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsC
            className="mb-3"
            color="info"
            icon={<CIcon icon={cilCalendar} height={36} />}
            value={resumen.totalProduccion}
            title="Producciones Activas"
          />
        </CCol>
        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsC
            className="mb-3"
            color="success"
            icon={<CIcon icon={cilArrowBottom} height={36} />}
            value={`$${resumen.balance.toLocaleString()}`}
            title="Balance Actual"
          />
        </CCol>

        <CCol xs={12} md={6} xl={3}>
          <CWidgetStatsC
            className="mb-3"
            color="danger"
            icon={<CIcon icon={cilArrowBottom} height={36} />}
            value={`$${resumen.comprasHoy.toLocaleString()}`}
            title="Compras Hoy"
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol md={6} className="mb-4">
          <CCard
  style={{
    backdropFilter: 'blur(16px)',
    background: 'rgba(255,255,255,0.95)', // más blanco para que los campos resalten
    borderRadius: 24,
    boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,1)',
  }}
>
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
                  {ventasRecientes.map((v) => (
                    <CTableRow key={v.id}>
                      <CTableDataCell>{v.id}</CTableDataCell>
                      <CTableDataCell>{v.cliente}</CTableDataCell>
                      <CTableDataCell>{v.fecha}</CTableDataCell>
                      <CTableDataCell>${v.total}</CTableDataCell>
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
        <CCol md={6} className="mb-4">
          <CCard
  style={{
    backdropFilter: 'blur(16px)',
    background: 'rgba(255,255,255,0.95)', // más blanco para que los campos resalten
    borderRadius: 24,
    boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,1)',
  }}
>
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
                  {comprasRecientes.map((c) => (
                    <CTableRow key={c.id}>
                      <CTableDataCell>{c.id}</CTableDataCell>
                      <CTableDataCell>{c.proveedor}</CTableDataCell>
                      <CTableDataCell>{c.fecha}</CTableDataCell>
                      <CTableDataCell>${c.total}</CTableDataCell>
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

      <CRow>
        <CCol md={6} className="mb-4">
         <CCard
  style={{
    backdropFilter: 'blur(16px)',
    background: 'rgba(255,255,255,0.95)', // más blanco para que los campos resalten
    borderRadius: 24,
    boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,1)',
  }}
>
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
                  {inventarioBajo.map((i) => (
                    <CTableRow key={i.id}>
                      <CTableDataCell>{i.producto}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={i.cantidad < 100 ? 'danger' : 'warning'}>
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
        <CCol md={6} className="mb-4">
          <CCard
  style={{
    backdropFilter: 'blur(16px)',
    background: 'rgba(255,255,255,0.95)', // más blanco para que los campos resalten
    borderRadius: 24,
    boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,1)',
  }}
>
            <CCardHeader className="fw-bold">Producción Activa</CCardHeader>
            <CCardBody>
              <CTable hover responsive align="middle">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Producto</CTableHeaderCell>
                    <CTableHeaderCell>Siembra</CTableHeaderCell>
                    <CTableHeaderCell>Cosecha</CTableHeaderCell>
                    <CTableHeaderCell>Responsable</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {produccionActiva.map((p) => (
                    <CTableRow key={p.id}>
                      <CTableDataCell>{p.producto}</CTableDataCell>
                      <CTableDataCell>{p.fecha_siembra}</CTableDataCell>
                      <CTableDataCell>{p.fecha_cosecha}</CTableDataCell>
                      <CTableDataCell>{p.responsable}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol md={12} className="mb-4">
          <CCard
  style={{
    backdropFilter: 'blur(16px)',
    background: 'rgba(255,255,255,0.95)', // más blanco para que los campos resalten
    borderRadius: 24,
    boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,1)',
  }}
>
            <CCardHeader className="fw-bold">Balance Mensual</CCardHeader>
            <CCardBody>
              <CTable hover responsive align="middle">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Mes</CTableHeaderCell>
                    <CTableHeaderCell>Ingresos</CTableHeaderCell>
                    <CTableHeaderCell>Egresos</CTableHeaderCell>
                    <CTableHeaderCell>Balance</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {balanceMensual.map((b, idx) => (
                    <CTableRow key={idx}>
                      <CTableDataCell>{b.mes}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color="success">${b.ingresos.toLocaleString()}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color="danger">${b.egresos.toLocaleString()}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={b.ingresos - b.egresos >= 0 ? 'info' : 'danger'}>
                          ${b.ingresos - b.egresos}
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