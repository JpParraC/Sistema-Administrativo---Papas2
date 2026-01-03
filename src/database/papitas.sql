--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2026-01-03 02:21:26

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 20072)
-- Name: bdtma_cliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bdtma_cliente (
    tma_idclien integer NOT NULL,
    tma_nombrec character varying(255),
    tma_direcci character varying(255),
    tma_telefon character varying(20),
    tma_emailcl character varying(255),
    tma_fechreg timestamp without time zone
);


ALTER TABLE public.bdtma_cliente OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 20071)
-- Name: bdtma_cliente_tma_idclien_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bdtma_cliente_tma_idclien_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bdtma_cliente_tma_idclien_seq OWNER TO postgres;

--
-- TOC entry 5012 (class 0 OID 0)
-- Dependencies: 223
-- Name: bdtma_cliente_tma_idclien_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bdtma_cliente_tma_idclien_seq OWNED BY public.bdtma_cliente.tma_idclien;


--
-- TOC entry 222 (class 1259 OID 20063)
-- Name: bdtma_personal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bdtma_personal (
    tma_idperso integer NOT NULL,
    tma_nombrep character varying(255),
    tma_cargope character varying(255),
    tma_fechcon date,
    tma_salario numeric(10,2),
    tma_telefon character varying(20),
    tma_emailpe character varying(255),
    tma_estadpe character varying(50)
);


ALTER TABLE public.bdtma_personal OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 20062)
-- Name: bdtma_personal_tma_idperso_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bdtma_personal_tma_idperso_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bdtma_personal_tma_idperso_seq OWNER TO postgres;

--
-- TOC entry 5013 (class 0 OID 0)
-- Dependencies: 221
-- Name: bdtma_personal_tma_idperso_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bdtma_personal_tma_idperso_seq OWNED BY public.bdtma_personal.tma_idperso;


--
-- TOC entry 228 (class 1259 OID 20093)
-- Name: bdtma_produc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bdtma_produc (
    tma_idprodu integer NOT NULL,
    tma_nombrep character varying(255),
    tma_descrip text,
    tma_unidade character varying(50),
    tma_preciou numeric(10,2),
    tma_stockmi integer,
    tma_tipo character varying(20)
);


ALTER TABLE public.bdtma_produc OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 20092)
-- Name: bdtma_produc_tma_idprodu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bdtma_produc_tma_idprodu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bdtma_produc_tma_idprodu_seq OWNER TO postgres;

--
-- TOC entry 5014 (class 0 OID 0)
-- Dependencies: 227
-- Name: bdtma_produc_tma_idprodu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bdtma_produc_tma_idprodu_seq OWNED BY public.bdtma_produc.tma_idprodu;


--
-- TOC entry 236 (class 1259 OID 20148)
-- Name: bdtma_proveed; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bdtma_proveed (
    tma_idprove integer NOT NULL,
    tma_nombrep character varying(255),
    tma_direcc character varying(255),
    tma_telefon character varying(20),
    tma_emailpro character varying(255),
    tma_rif character varying(50) NOT NULL
);


ALTER TABLE public.bdtma_proveed OWNER TO postgres;

--
-- TOC entry 5015 (class 0 OID 0)
-- Dependencies: 236
-- Name: COLUMN bdtma_proveed.tma_rif; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.bdtma_proveed.tma_rif IS 'rif de la empresa';


--
-- TOC entry 235 (class 1259 OID 20147)
-- Name: bdtma_proveed_tma_idprove_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bdtma_proveed_tma_idprove_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bdtma_proveed_tma_idprove_seq OWNER TO postgres;

--
-- TOC entry 5016 (class 0 OID 0)
-- Dependencies: 235
-- Name: bdtma_proveed_tma_idprove_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bdtma_proveed_tma_idprove_seq OWNED BY public.bdtma_proveed.tma_idprove;


--
-- TOC entry 246 (class 1259 OID 20257)
-- Name: cargos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cargos (
    id integer NOT NULL,
    nombre_cargo character varying(80) NOT NULL,
    descripcion text,
    nivel character varying(30),
    salario_base numeric(10,2),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cargos OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 20256)
-- Name: cargos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cargos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cargos_id_seq OWNER TO postgres;

--
-- TOC entry 5017 (class 0 OID 0)
-- Dependencies: 245
-- Name: cargos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cargos_id_seq OWNED BY public.cargos.id;


--
-- TOC entry 220 (class 1259 OID 20054)
-- Name: tb_balance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_balance (
    tb_idbalanc integer NOT NULL,
    tb_fechabal date,
    tb_tipomovi character varying(255),
    tb_montobal numeric(10,2),
    tb_describa text,
    tb_idrefbal integer,
    tb_tiporefb character varying(255)
);


ALTER TABLE public.tb_balance OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 20053)
-- Name: tb_balance_tb_idbalanc_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_balance_tb_idbalanc_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tb_balance_tb_idbalanc_seq OWNER TO postgres;

--
-- TOC entry 5018 (class 0 OID 0)
-- Dependencies: 219
-- Name: tb_balance_tb_idbalanc_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_balance_tb_idbalanc_seq OWNED BY public.tb_balance.tb_idbalanc;


--
-- TOC entry 238 (class 1259 OID 20157)
-- Name: tb_compras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_compras (
    tb_idcompra integer NOT NULL,
    tb_idproveed integer NOT NULL,
    tb_fechcomp date,
    tb_totalcom numeric(10,2),
    tb_estadcom character varying(50),
    tb_detalle character varying(255)
);


ALTER TABLE public.tb_compras OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 20156)
-- Name: tb_compras_tb_idcompra_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_compras_tb_idcompra_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tb_compras_tb_idcompra_seq OWNER TO postgres;

--
-- TOC entry 5019 (class 0 OID 0)
-- Dependencies: 237
-- Name: tb_compras_tb_idcompra_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_compras_tb_idcompra_seq OWNED BY public.tb_compras.tb_idcompra;


--
-- TOC entry 240 (class 1259 OID 20169)
-- Name: tb_detcomp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_detcomp (
    tb_iddetco integer NOT NULL,
    tb_idcompr integer NOT NULL,
    tb_idprodu integer NOT NULL,
    tb_cantidad integer,
    tb_precunic numeric(10,2),
    tb_subtotal numeric(10,2)
);


ALTER TABLE public.tb_detcomp OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 20168)
-- Name: tb_detcomp_tb_iddetco_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_detcomp_tb_iddetco_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tb_detcomp_tb_iddetco_seq OWNER TO postgres;

--
-- TOC entry 5020 (class 0 OID 0)
-- Dependencies: 239
-- Name: tb_detcomp_tb_iddetco_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_detcomp_tb_iddetco_seq OWNED BY public.tb_detcomp.tb_iddetco;


--
-- TOC entry 230 (class 1259 OID 20102)
-- Name: tb_detvent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_detvent (
    tb_iddetve integer NOT NULL,
    tb_idventa integer NOT NULL,
    tb_idprodu integer NOT NULL,
    tb_cantida integer,
    tb_precuni numeric(10,2),
    tb_subtota numeric(10,2)
);


ALTER TABLE public.tb_detvent OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 20101)
-- Name: tb_detvent_tb_iddetve_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_detvent_tb_iddetve_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tb_detvent_tb_iddetve_seq OWNER TO postgres;

--
-- TOC entry 5021 (class 0 OID 0)
-- Dependencies: 229
-- Name: tb_detvent_tb_iddetve_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_detvent_tb_iddetve_seq OWNED BY public.tb_detvent.tb_iddetve;


--
-- TOC entry 234 (class 1259 OID 20136)
-- Name: tb_invinven; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_invinven (
    tb_idinven integer NOT NULL,
    tb_idprodu integer NOT NULL,
    tb_cantidis integer,
    tb_fechult date
);


ALTER TABLE public.tb_invinven OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 20135)
-- Name: tb_invinven_tb_idinven_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_invinven_tb_idinven_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tb_invinven_tb_idinven_seq OWNER TO postgres;

--
-- TOC entry 5022 (class 0 OID 0)
-- Dependencies: 233
-- Name: tb_invinven_tb_idinven_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_invinven_tb_idinven_seq OWNED BY public.tb_invinven.tb_idinven;


--
-- TOC entry 232 (class 1259 OID 20119)
-- Name: tb_producc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_producc (
    tb_idproduc integer NOT NULL,
    tb_idprodut integer NOT NULL,
    tb_fechsiem date,
    tb_fechcose date,
    tb_canespel numeric(10,2),
    tb_canoscoh numeric(10,2),
    tb_areacult numeric(10,2),
    tb_costprod numeric(10,2),
    tb_idrespon integer
);


ALTER TABLE public.tb_producc OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 20118)
-- Name: tb_producc_tb_idproduc_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_producc_tb_idproduc_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tb_producc_tb_idproduc_seq OWNER TO postgres;

--
-- TOC entry 5023 (class 0 OID 0)
-- Dependencies: 231
-- Name: tb_producc_tb_idproduc_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_producc_tb_idproduc_seq OWNED BY public.tb_producc.tb_idproduc;


--
-- TOC entry 218 (class 1259 OID 20045)
-- Name: tb_reportes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_reportes (
    tb_idreport integer NOT NULL,
    tb_nombrerp character varying(255),
    tb_fechgene timestamp without time zone,
    tb_contrepo text,
    tb_generepo character varying(255)
);


ALTER TABLE public.tb_reportes OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 20044)
-- Name: tb_reportes_tb_idreport_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_reportes_tb_idreport_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tb_reportes_tb_idreport_seq OWNER TO postgres;

--
-- TOC entry 5024 (class 0 OID 0)
-- Dependencies: 217
-- Name: tb_reportes_tb_idreport_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_reportes_tb_idreport_seq OWNED BY public.tb_reportes.tb_idreport;


--
-- TOC entry 244 (class 1259 OID 20204)
-- Name: tb_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_roles (
    id integer NOT NULL,
    rol_name character varying(50) NOT NULL
);


ALTER TABLE public.tb_roles OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 20203)
-- Name: tb_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tb_roles_id_seq OWNER TO postgres;

--
-- TOC entry 5025 (class 0 OID 0)
-- Dependencies: 243
-- Name: tb_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_roles_id_seq OWNED BY public.tb_roles.id;


--
-- TOC entry 242 (class 1259 OID 20186)
-- Name: tb_usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_usuarios (
    id integer NOT NULL,
    usuario character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    email character varying(100),
    telefono character varying(20),
    rol character varying(20) DEFAULT 'user'::character varying NOT NULL,
    estado character varying(1) DEFAULT 'A'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    rol_id integer
);


ALTER TABLE public.tb_usuarios OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 20185)
-- Name: tb_usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tb_usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 5026 (class 0 OID 0)
-- Dependencies: 241
-- Name: tb_usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_usuarios_id_seq OWNED BY public.tb_usuarios.id;


--
-- TOC entry 226 (class 1259 OID 20081)
-- Name: tb_ventas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_ventas (
    tb_idventa integer NOT NULL,
    tb_idclien integer NOT NULL,
    tb_fechvent timestamp without time zone,
    tb_totalven numeric(10,2),
    tb_estadven character varying(50)
);


ALTER TABLE public.tb_ventas OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 20080)
-- Name: tb_ventas_tb_idventa_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_ventas_tb_idventa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tb_ventas_tb_idventa_seq OWNER TO postgres;

--
-- TOC entry 5027 (class 0 OID 0)
-- Dependencies: 225
-- Name: tb_ventas_tb_idventa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_ventas_tb_idventa_seq OWNED BY public.tb_ventas.tb_idventa;


--
-- TOC entry 4768 (class 2604 OID 20075)
-- Name: bdtma_cliente tma_idclien; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_cliente ALTER COLUMN tma_idclien SET DEFAULT nextval('public.bdtma_cliente_tma_idclien_seq'::regclass);


--
-- TOC entry 4767 (class 2604 OID 20066)
-- Name: bdtma_personal tma_idperso; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_personal ALTER COLUMN tma_idperso SET DEFAULT nextval('public.bdtma_personal_tma_idperso_seq'::regclass);


--
-- TOC entry 4770 (class 2604 OID 20096)
-- Name: bdtma_produc tma_idprodu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_produc ALTER COLUMN tma_idprodu SET DEFAULT nextval('public.bdtma_produc_tma_idprodu_seq'::regclass);


--
-- TOC entry 4774 (class 2604 OID 20151)
-- Name: bdtma_proveed tma_idprove; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_proveed ALTER COLUMN tma_idprove SET DEFAULT nextval('public.bdtma_proveed_tma_idprove_seq'::regclass);


--
-- TOC entry 4783 (class 2604 OID 20260)
-- Name: cargos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos ALTER COLUMN id SET DEFAULT nextval('public.cargos_id_seq'::regclass);


--
-- TOC entry 4766 (class 2604 OID 20057)
-- Name: tb_balance tb_idbalanc; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_balance ALTER COLUMN tb_idbalanc SET DEFAULT nextval('public.tb_balance_tb_idbalanc_seq'::regclass);


--
-- TOC entry 4775 (class 2604 OID 20160)
-- Name: tb_compras tb_idcompra; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_compras ALTER COLUMN tb_idcompra SET DEFAULT nextval('public.tb_compras_tb_idcompra_seq'::regclass);


--
-- TOC entry 4776 (class 2604 OID 20172)
-- Name: tb_detcomp tb_iddetco; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detcomp ALTER COLUMN tb_iddetco SET DEFAULT nextval('public.tb_detcomp_tb_iddetco_seq'::regclass);


--
-- TOC entry 4771 (class 2604 OID 20105)
-- Name: tb_detvent tb_iddetve; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detvent ALTER COLUMN tb_iddetve SET DEFAULT nextval('public.tb_detvent_tb_iddetve_seq'::regclass);


--
-- TOC entry 4773 (class 2604 OID 20139)
-- Name: tb_invinven tb_idinven; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_invinven ALTER COLUMN tb_idinven SET DEFAULT nextval('public.tb_invinven_tb_idinven_seq'::regclass);


--
-- TOC entry 4772 (class 2604 OID 20122)
-- Name: tb_producc tb_idproduc; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_producc ALTER COLUMN tb_idproduc SET DEFAULT nextval('public.tb_producc_tb_idproduc_seq'::regclass);


--
-- TOC entry 4765 (class 2604 OID 20048)
-- Name: tb_reportes tb_idreport; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_reportes ALTER COLUMN tb_idreport SET DEFAULT nextval('public.tb_reportes_tb_idreport_seq'::regclass);


--
-- TOC entry 4782 (class 2604 OID 20207)
-- Name: tb_roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_roles ALTER COLUMN id SET DEFAULT nextval('public.tb_roles_id_seq'::regclass);


--
-- TOC entry 4777 (class 2604 OID 20189)
-- Name: tb_usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_usuarios ALTER COLUMN id SET DEFAULT nextval('public.tb_usuarios_id_seq'::regclass);


--
-- TOC entry 4769 (class 2604 OID 20084)
-- Name: tb_ventas tb_idventa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_ventas ALTER COLUMN tb_idventa SET DEFAULT nextval('public.tb_ventas_tb_idventa_seq'::regclass);


--
-- TOC entry 4984 (class 0 OID 20072)
-- Dependencies: 224
-- Data for Name: bdtma_cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bdtma_cliente (tma_idclien, tma_nombrec, tma_direcci, tma_telefon, tma_emailcl, tma_fechreg) FROM stdin;
4	jose mata	Calle vermeja, local 34	04126759712	jose@gmail.com	2025-11-18 11:18:16.500453
3	John Doe	Colinas de Pirineos	04245678923	jd@gmail.com	2025-11-17 23:07:17.181437
5	Sierras Yeison	23 de enero parte baja	90938446	sierras@gmail.com	2025-11-19 02:22:31.175393
6	Parra castillo juan pablo	23 de enero parte baja	041267597122	parracastilloj6@gmail.com	2025-12-15 00:39:24.760042
7	jorge davila	23 de enero parte baja	041238489954	jorge@gmail.com	2025-12-29 02:57:03.035773
\.


--
-- TOC entry 4982 (class 0 OID 20063)
-- Dependencies: 222
-- Data for Name: bdtma_personal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bdtma_personal (tma_idperso, tma_nombrep, tma_cargope, tma_fechcon, tma_salario, tma_telefon, tma_emailpe, tma_estadpe) FROM stdin;
1	Ashly	Jefe de cultivo	2026-01-01	1000.00	04126759712	1@gmail.com	Activo
2	pablo	jefe area	2026-02-22	10000.00	04147109021	parraj6@gmail.com	Activo
\.


--
-- TOC entry 4988 (class 0 OID 20093)
-- Dependencies: 228
-- Data for Name: bdtma_produc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bdtma_produc (tma_idprodu, tma_nombrep, tma_descrip, tma_unidade, tma_preciou, tma_stockmi, tma_tipo) FROM stdin;
2	Semilla de Papa Criolla	Variedad pequeña, sabor dulce y textura suave	kg	1.50	200	insumo
4	Semilla de Papa Blanca	Variedad común, ideal para freír y hervir	kg	1.40	250	insumo
5	Semilla de Papa Amarilla	Textura firme, buena para puré y guisos	kg	1.81	180	insumo
6	Fertilizante NPK 15-15-15	Fertilizante equilibrado para crecimiento de papa	kg	0.80	500	cosecha
54	1111	11	1	1.00	1	cosecha
49	Papa Mestizaw	Variedad pequeña, sabor dulce y textura suave	kg	1.50	200	insumo
8	Manguera de riego	Manguera de 50m para riego de cultivos	unidad	20.00	50	insumo
55	Semilla pimenton	bolsa grande	1.5	2.50	50	insumo
\.


--
-- TOC entry 4996 (class 0 OID 20148)
-- Dependencies: 236
-- Data for Name: bdtma_proveed; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bdtma_proveed (tma_idprove, tma_nombrep, tma_direcc, tma_telefon, tma_emailpro, tma_rif) FROM stdin;
28	Control Agricola Tachira	La Guacara	04145678913	sasaasa@gmail.com	J-1234567890
24	Tu Cosecha Agricola Suárez	Barrio Obrero, sector Plaza Los Mangosi	04129876767	sasaasa@gmail.com	J-232345678920
26	INVERSIONES MONARCA C.A	Barrio Obrero, sector Plaza Los Mangosi	04129876767	monarca@gmail.com	J-12345678
27	Parking Wallyqqiiiiio	Bello Monte	092093902	parkingwall@gmail.com	j-28061677
30	Inversioness Castilloo	23 de enero parte baja	04126461023	pacaspa@gmail.com	J-280616770
\.


--
-- TOC entry 5006 (class 0 OID 20257)
-- Dependencies: 246
-- Data for Name: cargos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cargos (id, nombre_cargo, descripcion, nivel, salario_base, created_at, updated_at) FROM stdin;
1	Gerente General	Responsable de la gestión general de la empresa	Directivo	2500.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
2	Subgerente	Apoya al gerente en la toma de decisiones	Directivo	2000.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
3	Administrador	Gestiona recursos administrativos y operativos	Administrativo	1800.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
4	Contador	Responsable de la contabilidad y finanzas	Profesional	1600.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
5	Analista de Sistemas	Desarrolla y mantiene sistemas informáticos	Profesional	1700.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
6	Supervisor	Supervisa las operaciones diarias del personal	Operativo	1400.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
7	Asistente Administrativo	Apoyo en tareas administrativas	Administrativo	1000.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
8	Recepcionista	Atiende clientes y llamadas	Operativo	900.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
9	Vendedor	Encargado de ventas y atención al cliente	Operativo	950.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
10	Técnico de Soporte	Brinda soporte técnico a usuarios	Técnico	1100.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
11	Chofer	Responsable del transporte y logística	Operativo	850.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
12	Personal de Limpieza	Mantenimiento y limpieza de instalaciones	Operativo	700.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
\.


--
-- TOC entry 4980 (class 0 OID 20054)
-- Dependencies: 220
-- Data for Name: tb_balance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_balance (tb_idbalanc, tb_fechabal, tb_tipomovi, tb_montobal, tb_describa, tb_idrefbal, tb_tiporefb) FROM stdin;
\.


--
-- TOC entry 4998 (class 0 OID 20157)
-- Dependencies: 238
-- Data for Name: tb_compras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_compras (tb_idcompra, tb_idproveed, tb_fechcomp, tb_totalcom, tb_estadcom, tb_detalle) FROM stdin;
68	30	2025-12-31	2.90	Pendiente	\N
69	30	2025-12-31	2.90	Pendiente	\N
70	30	2025-12-31	2.90	Pendiente	\N
71	30	2025-12-31	2.90	Pendiente	\N
72	30	2025-12-31	2.90	Pendiente	\N
73	30	2025-12-31	2.90	Pendiente	\N
74	30	2025-12-31	2.90	Pendiente	\N
75	30	2025-12-31	2.90	Pendiente	\N
22	26	2025-11-18	259.60	Pagada	Producto: 8, Cantidad: 2, Precio: 20, Subtotal: 40; Producto: 5, Cantidad: 122, Precio: 1.8, Subtotal: 219.6
\.


--
-- TOC entry 5000 (class 0 OID 20169)
-- Dependencies: 240
-- Data for Name: tb_detcomp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_detcomp (tb_iddetco, tb_idcompr, tb_idprodu, tb_cantidad, tb_precunic, tb_subtotal) FROM stdin;
124	68	49	1	1.50	1.50
125	68	4	1	1.40	1.40
126	69	49	1	1.50	1.50
4	22	8	2	20.00	40.00
5	22	5	122	1.80	219.60
127	69	4	1	1.40	1.40
128	70	49	1	1.50	1.50
129	70	4	1	1.40	1.40
130	71	49	1	1.50	1.50
131	71	4	1	1.40	1.40
132	72	49	1	1.50	1.50
133	72	4	1	1.40	1.40
134	73	49	1	1.50	1.50
135	73	4	1	1.40	1.40
136	74	49	1	1.50	1.50
137	74	4	1	1.40	1.40
138	75	49	1	1.50	1.50
139	75	4	1	1.40	1.40
\.


--
-- TOC entry 4990 (class 0 OID 20102)
-- Dependencies: 230
-- Data for Name: tb_detvent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_detvent (tb_iddetve, tb_idventa, tb_idprodu, tb_cantida, tb_precuni, tb_subtota) FROM stdin;
\.


--
-- TOC entry 4994 (class 0 OID 20136)
-- Dependencies: 234
-- Data for Name: tb_invinven; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_invinven (tb_idinven, tb_idprodu, tb_cantidis, tb_fechult) FROM stdin;
\.


--
-- TOC entry 4992 (class 0 OID 20119)
-- Dependencies: 232
-- Data for Name: tb_producc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_producc (tb_idproduc, tb_idprodut, tb_fechsiem, tb_fechcose, tb_canespel, tb_canoscoh, tb_areacult, tb_costprod, tb_idrespon) FROM stdin;
\.


--
-- TOC entry 4978 (class 0 OID 20045)
-- Dependencies: 218
-- Data for Name: tb_reportes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_reportes (tb_idreport, tb_nombrerp, tb_fechgene, tb_contrepo, tb_generepo) FROM stdin;
\.


--
-- TOC entry 5004 (class 0 OID 20204)
-- Dependencies: 244
-- Data for Name: tb_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_roles (id, rol_name) FROM stdin;
\.


--
-- TOC entry 5002 (class 0 OID 20186)
-- Dependencies: 242
-- Data for Name: tb_usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_usuarios (id, usuario, password, nombre, apellido, email, telefono, rol, estado, created_at, updated_at, rol_id) FROM stdin;
\.


--
-- TOC entry 4986 (class 0 OID 20081)
-- Dependencies: 226
-- Data for Name: tb_ventas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_ventas (tb_idventa, tb_idclien, tb_fechvent, tb_totalven, tb_estadven) FROM stdin;
\.


--
-- TOC entry 5028 (class 0 OID 0)
-- Dependencies: 223
-- Name: bdtma_cliente_tma_idclien_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bdtma_cliente_tma_idclien_seq', 7, true);


--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 221
-- Name: bdtma_personal_tma_idperso_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bdtma_personal_tma_idperso_seq', 3, true);


--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 227
-- Name: bdtma_produc_tma_idprodu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bdtma_produc_tma_idprodu_seq', 55, true);


--
-- TOC entry 5031 (class 0 OID 0)
-- Dependencies: 235
-- Name: bdtma_proveed_tma_idprove_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bdtma_proveed_tma_idprove_seq', 30, true);


--
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 245
-- Name: cargos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cargos_id_seq', 12, true);


--
-- TOC entry 5033 (class 0 OID 0)
-- Dependencies: 219
-- Name: tb_balance_tb_idbalanc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_balance_tb_idbalanc_seq', 1, false);


--
-- TOC entry 5034 (class 0 OID 0)
-- Dependencies: 237
-- Name: tb_compras_tb_idcompra_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_compras_tb_idcompra_seq', 75, true);


--
-- TOC entry 5035 (class 0 OID 0)
-- Dependencies: 239
-- Name: tb_detcomp_tb_iddetco_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_detcomp_tb_iddetco_seq', 139, true);


--
-- TOC entry 5036 (class 0 OID 0)
-- Dependencies: 229
-- Name: tb_detvent_tb_iddetve_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_detvent_tb_iddetve_seq', 1, false);


--
-- TOC entry 5037 (class 0 OID 0)
-- Dependencies: 233
-- Name: tb_invinven_tb_idinven_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_invinven_tb_idinven_seq', 1, false);


--
-- TOC entry 5038 (class 0 OID 0)
-- Dependencies: 231
-- Name: tb_producc_tb_idproduc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_producc_tb_idproduc_seq', 1, false);


--
-- TOC entry 5039 (class 0 OID 0)
-- Dependencies: 217
-- Name: tb_reportes_tb_idreport_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_reportes_tb_idreport_seq', 1, false);


--
-- TOC entry 5040 (class 0 OID 0)
-- Dependencies: 243
-- Name: tb_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_roles_id_seq', 1, false);


--
-- TOC entry 5041 (class 0 OID 0)
-- Dependencies: 241
-- Name: tb_usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_usuarios_id_seq', 1, false);


--
-- TOC entry 5042 (class 0 OID 0)
-- Dependencies: 225
-- Name: tb_ventas_tb_idventa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_ventas_tb_idventa_seq', 1, false);


--
-- TOC entry 4793 (class 2606 OID 20079)
-- Name: bdtma_cliente bdtma_cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_cliente
    ADD CONSTRAINT bdtma_cliente_pkey PRIMARY KEY (tma_idclien);


--
-- TOC entry 4791 (class 2606 OID 20070)
-- Name: bdtma_personal bdtma_personal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_personal
    ADD CONSTRAINT bdtma_personal_pkey PRIMARY KEY (tma_idperso);


--
-- TOC entry 4797 (class 2606 OID 20100)
-- Name: bdtma_produc bdtma_produc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_produc
    ADD CONSTRAINT bdtma_produc_pkey PRIMARY KEY (tma_idprodu);


--
-- TOC entry 4805 (class 2606 OID 20155)
-- Name: bdtma_proveed bdtma_proveed_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_proveed
    ADD CONSTRAINT bdtma_proveed_pkey PRIMARY KEY (tma_idprove);


--
-- TOC entry 4821 (class 2606 OID 20266)
-- Name: cargos cargos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos
    ADD CONSTRAINT cargos_pkey PRIMARY KEY (id);


--
-- TOC entry 4789 (class 2606 OID 20061)
-- Name: tb_balance tb_balance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_balance
    ADD CONSTRAINT tb_balance_pkey PRIMARY KEY (tb_idbalanc);


--
-- TOC entry 4807 (class 2606 OID 20162)
-- Name: tb_compras tb_compras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_compras
    ADD CONSTRAINT tb_compras_pkey PRIMARY KEY (tb_idcompra);


--
-- TOC entry 4809 (class 2606 OID 20174)
-- Name: tb_detcomp tb_detcomp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detcomp
    ADD CONSTRAINT tb_detcomp_pkey PRIMARY KEY (tb_iddetco);


--
-- TOC entry 4799 (class 2606 OID 20107)
-- Name: tb_detvent tb_detvent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detvent
    ADD CONSTRAINT tb_detvent_pkey PRIMARY KEY (tb_iddetve);


--
-- TOC entry 4803 (class 2606 OID 20141)
-- Name: tb_invinven tb_invinven_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_invinven
    ADD CONSTRAINT tb_invinven_pkey PRIMARY KEY (tb_idinven);


--
-- TOC entry 4801 (class 2606 OID 20124)
-- Name: tb_producc tb_producc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_producc
    ADD CONSTRAINT tb_producc_pkey PRIMARY KEY (tb_idproduc);


--
-- TOC entry 4787 (class 2606 OID 20052)
-- Name: tb_reportes tb_reportes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_reportes
    ADD CONSTRAINT tb_reportes_pkey PRIMARY KEY (tb_idreport);


--
-- TOC entry 4817 (class 2606 OID 20209)
-- Name: tb_roles tb_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_roles
    ADD CONSTRAINT tb_roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4819 (class 2606 OID 20211)
-- Name: tb_roles tb_roles_rol_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_roles
    ADD CONSTRAINT tb_roles_rol_name_key UNIQUE (rol_name);


--
-- TOC entry 4811 (class 2606 OID 20201)
-- Name: tb_usuarios tb_usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_usuarios
    ADD CONSTRAINT tb_usuarios_email_key UNIQUE (email);


--
-- TOC entry 4813 (class 2606 OID 20197)
-- Name: tb_usuarios tb_usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_usuarios
    ADD CONSTRAINT tb_usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4815 (class 2606 OID 20199)
-- Name: tb_usuarios tb_usuarios_usuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_usuarios
    ADD CONSTRAINT tb_usuarios_usuario_key UNIQUE (usuario);


--
-- TOC entry 4795 (class 2606 OID 20086)
-- Name: tb_ventas tb_ventas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_ventas
    ADD CONSTRAINT tb_ventas_pkey PRIMARY KEY (tb_idventa);


--
-- TOC entry 4831 (class 2606 OID 20212)
-- Name: tb_usuarios fk_rol_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_usuarios
    ADD CONSTRAINT fk_rol_usuario FOREIGN KEY (rol_id) REFERENCES public.tb_roles(id);


--
-- TOC entry 4828 (class 2606 OID 20163)
-- Name: tb_compras tb_compras_tb_idproveed_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_compras
    ADD CONSTRAINT tb_compras_tb_idproveed_fkey FOREIGN KEY (tb_idproveed) REFERENCES public.bdtma_proveed(tma_idprove);


--
-- TOC entry 4829 (class 2606 OID 20175)
-- Name: tb_detcomp tb_detcomp_tb_idcompr_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detcomp
    ADD CONSTRAINT tb_detcomp_tb_idcompr_fkey FOREIGN KEY (tb_idcompr) REFERENCES public.tb_compras(tb_idcompra);


--
-- TOC entry 4830 (class 2606 OID 20180)
-- Name: tb_detcomp tb_detcomp_tb_idprodu_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detcomp
    ADD CONSTRAINT tb_detcomp_tb_idprodu_fkey FOREIGN KEY (tb_idprodu) REFERENCES public.bdtma_produc(tma_idprodu);


--
-- TOC entry 4823 (class 2606 OID 20113)
-- Name: tb_detvent tb_detvent_tb_idprodu_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detvent
    ADD CONSTRAINT tb_detvent_tb_idprodu_fkey FOREIGN KEY (tb_idprodu) REFERENCES public.bdtma_produc(tma_idprodu);


--
-- TOC entry 4824 (class 2606 OID 20108)
-- Name: tb_detvent tb_detvent_tb_idventa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detvent
    ADD CONSTRAINT tb_detvent_tb_idventa_fkey FOREIGN KEY (tb_idventa) REFERENCES public.tb_ventas(tb_idventa);


--
-- TOC entry 4827 (class 2606 OID 20142)
-- Name: tb_invinven tb_invinven_tb_idprodu_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_invinven
    ADD CONSTRAINT tb_invinven_tb_idprodu_fkey FOREIGN KEY (tb_idprodu) REFERENCES public.bdtma_produc(tma_idprodu);


--
-- TOC entry 4825 (class 2606 OID 20125)
-- Name: tb_producc tb_producc_tb_idprodut_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_producc
    ADD CONSTRAINT tb_producc_tb_idprodut_fkey FOREIGN KEY (tb_idprodut) REFERENCES public.bdtma_produc(tma_idprodu);


--
-- TOC entry 4826 (class 2606 OID 20130)
-- Name: tb_producc tb_producc_tb_idrespon_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_producc
    ADD CONSTRAINT tb_producc_tb_idrespon_fkey FOREIGN KEY (tb_idrespon) REFERENCES public.bdtma_personal(tma_idperso);


--
-- TOC entry 4822 (class 2606 OID 20087)
-- Name: tb_ventas tb_ventas_tb_idclien_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_ventas
    ADD CONSTRAINT tb_ventas_tb_idclien_fkey FOREIGN KEY (tb_idclien) REFERENCES public.bdtma_cliente(tma_idclien);


-- Completed on 2026-01-03 02:21:27

--
-- PostgreSQL database dump complete
--

