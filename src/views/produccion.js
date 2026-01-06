import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormInput,
  CFormSelect, CBadge
} from '@coreui/react'

// ================== MOCKS ==================
const personalMock = [
  { id: 1, nombre_empleado: 'Juan Pérez' },
  { id: 2, nombre_empleado: 'Ana Gómez' }
]

const produccionMock = [
  {
    id: 1,
    tb_idprodut: 1,
    producto: 'Papa Negra',
    fecha_siembra: '2025-05-01',
    fecha_cosecha: '2025-08-01',
    cantidad_esperada: 2000,
    cantidad_cosechada: 1950,
    area_cultivo: 3.5,
    costo_produccion: 12000,
    responsable_id: 1,
    responsable: 'Juan Pérez'
  }
]

// ================== API ==================
const API_PRODUCTOS = 'http://localhost:4000/api/productos'
const API_PERSONAL = 'http://localhost:4000/api/personal'
const API_PRODUCCION = 'http://localhost:4000/api/produccio' // ruta backend

const Produccion = () => {
  const [produccion, setProduccion] = useState([])
  const [productos, setProductos] = useState([])
  const [personal, setPersonal] = useState([])
  const [visible, setVisible] = useState(false)

  const [form, setForm] = useState({
    tb_idprodut: '',
    fecha_siembra: '',
    fecha_cosecha: '',
    cantidad_esperada: '',
    cantidad_cosechada: '',
    area_cultivo: '',
    costo_produccion: '',
    responsable_id: ''
  })

  // ================== FILTROS ==================
  const [filtroProducto, setFiltroProducto] = useState('')
  const [filtroResponsable, setFiltroResponsable] = useState('')
  const [filtroFechaSiembraDesde, setFiltroFechaSiembraDesde] = useState('')
  const [filtroFechaSiembraHasta, setFiltroFechaSiembraHasta] = useState('')
  const [filtroFechaCosechaDesde, setFiltroFechaCosechaDesde] = useState('')
  const [filtroFechaCosechaHasta, setFiltroFechaCosechaHasta] = useState('')

  // ================== CARGA INICIAL ==================
  useEffect(() => {
    fetchProductos()
    fetchPersonal()
    setProduccion(produccionMock)
  }, [])

  const fetchProductos = async () => {
    try {
      const res = await fetch(API_PRODUCTOS)
      const data = await res.json()
      setProductos(data)
    } catch (error) {
      console.error('Error cargando productos', error)
    }
  }

  const fetchPersonal = async () => {
    try {
      const res = await fetch(API_PERSONAL)
      const data = await res.json()
      setPersonal(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error cargando personal', error)
      setPersonal([])
    }
  }

  const productosCosecha = productos.filter((p) => p.tma_tipo === 'cosecha')

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddProduccion = async (e) => {
    e.preventDefault()

    try {
      const payload = {
        tb_idprodut: parseInt(form.tb_idprodut),          // ⚡ CAMBIO A tb_idprodut
        fecha_siembra: form.fecha_siembra,
        fecha_cosecha: form.fecha_cosecha,
        cantidad_esperada: parseFloat(form.cantidad_esperada),
        cantidad_cosechada: form.cantidad_cosechada ? parseFloat(form.cantidad_cosechada) : 0,
        area_cultivo: parseFloat(form.area_cultivo),
        costo_produccion: parseFloat(form.costo_produccion),
        responsable_id: parseInt(form.responsable_id)
      }

      const res = await fetch(API_PRODUCCION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Error al registrar producción')

      const data = await res.json()

      const producto = productos.find((p) => p.tma_idprodu === data.tb_idprodut)
      const responsable = personal.find((p) => p.id === data.responsable_id)

      setProduccion([
        ...produccion,
        {
          ...data,
          producto: producto ? producto.tma_nombrep : '',
          responsable: responsable ? responsable.tma_nombrep : ''
        }
      ])

      setVisible(false)
      setForm({
        tb_idprodut: '',
        fecha_siembra: '',
        fecha_cosecha: '',
        cantidad_esperada: '',
        cantidad_cosechada: '',
        area_cultivo: '',
        costo_produccion: '',
        responsable_id: ''
      })
    } catch (error) {
      console.error('Error al crear producción:', error)
      alert('No se pudo registrar la producción')
    }
  }

  const produccionFiltrada = produccion.filter((item) => {
    const matchProducto = filtroProducto ? item.tb_idprodut === parseInt(filtroProducto) : true
    const matchResponsable = filtroResponsable ? item.responsable_id === parseInt(filtroResponsable) : true
    const matchSiembraDesde = filtroFechaSiembraDesde ? item.fecha_siembra >= filtroFechaSiembraDesde : true
    const matchSiembraHasta = filtroFechaSiembraHasta ? item.fecha_siembra <= filtroFechaSiembraHasta : true
    const matchCosechaDesde = filtroFechaCosechaDesde ? item.fecha_cosecha >= filtroFechaCosechaDesde : true
    const matchCosechaHasta = filtroFechaCosechaHasta ? item.fecha_cosecha <= filtroFechaCosechaHasta : true
    return matchProducto && matchResponsable && matchSiembraDesde && matchSiembraHasta && matchCosechaDesde && matchCosechaHasta
  })

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h5>Producción</h5>
        <CButton color="primary" onClick={() => setVisible(true)}>
          + Nueva Producción
        </CButton>
      </CCardHeader>

      <CCardBody>
        <CTable hover responsive bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Producto</CTableHeaderCell>
              <CTableHeaderCell>Siembra</CTableHeaderCell>
              <CTableHeaderCell>Cosecha</CTableHeaderCell>
              <CTableHeaderCell>Cant. Esperada</CTableHeaderCell>
              <CTableHeaderCell>Cant. Cosechada</CTableHeaderCell>
              <CTableHeaderCell>Área</CTableHeaderCell>
              <CTableHeaderCell>Costo</CTableHeaderCell>
              <CTableHeaderCell>Responsable</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {produccionFiltrada.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell><CBadge color="info">{item.producto}</CBadge></CTableDataCell>
                <CTableDataCell>{item.fecha_siembra}</CTableDataCell>
                <CTableDataCell>{item.fecha_cosecha}</CTableDataCell>
                <CTableDataCell>{item.cantidad_esperada}</CTableDataCell>
                <CTableDataCell>{item.cantidad_cosechada}</CTableDataCell>
                <CTableDataCell>{item.area_cultivo}</CTableDataCell>
                <CTableDataCell>${item.costo_produccion.toFixed(2)}</CTableDataCell>
                <CTableDataCell>{item.responsable}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader><strong>Nueva Producción</strong></CModalHeader>
        <CForm onSubmit={handleAddProduccion}>
          <CModalBody>

            <CFormSelect label="Producto" name="tb_idprodut" value={form.tb_idprodut} onChange={handleInputChange} required>
              <option value="">Seleccione producto</option>
              {productosCosecha.map((p) => (
                <option key={p.tma_idprodu} value={p.tma_idprodu}>{p.tma_nombrep}</option>
              ))}
            </CFormSelect>

            <CFormInput className="mt-2" type="date" label="Fecha de siembra" name="fecha_siembra" value={form.fecha_siembra} onChange={handleInputChange} required />
            <CFormInput className="mt-2" type="date" label="Fecha de cosecha" name="fecha_cosecha" value={form.fecha_cosecha} onChange={handleInputChange} required />
            <CFormInput className="mt-2" type="number" label="Cantidad esperada" name="cantidad_esperada" value={form.cantidad_esperada} onChange={handleInputChange} required />
            <CFormInput className="mt-2" type="number" label="Cantidad cosechada" name="cantidad_cosechada" value={form.cantidad_cosechada} onChange={handleInputChange} />
            <CFormInput className="mt-2" type="number" label="Área cultivo" name="area_cultivo" value={form.area_cultivo} onChange={handleInputChange} required />
            <CFormInput className="mt-2" type="number" label="Costo producción" name="costo_produccion" value={form.costo_produccion} onChange={handleInputChange} required />

            <CFormSelect className="mt-2" label="Responsable" name="responsable_id" value={form.responsable_id} onChange={handleInputChange} required>
              <option value="">Seleccione responsable</option>
              {personal.map((p) => (
                <option key={p.id} value={p.id}>{p.tma_nombrep}</option>
              ))}
            </CFormSelect>

          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>Cancelar</CButton>
            <CButton color="primary" type="submit">Guardar</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CCard>
  )
}

export default Produccion
