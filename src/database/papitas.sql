--
-- PostgreSQL database dump
--

\restrict x4yP0omcoM1etaYDGL27nXzAnCaJSHYyEEiJhDr0JLFaBIP0Z9Z3szdexiLuAdP

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-01-08 19:23:54

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
-- TOC entry 219 (class 1259 OID 24809)
-- Name: bdtma_cliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bdtma_cliente (
    tma_idclien integer NOT NULL,
    tma_nombrec character varying(255),
    tma_direcci character varying(255),
    tma_telefon character varying(20),
    tma_emailcl character varying(255),
    tma_fechreg timestamp without time zone,
    tma_cedula character varying(25)
);


ALTER TABLE public.bdtma_cliente OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24815)
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
-- TOC entry 5175 (class 0 OID 0)
-- Dependencies: 220
-- Name: bdtma_cliente_tma_idclien_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bdtma_cliente_tma_idclien_seq OWNED BY public.bdtma_cliente.tma_idclien;


--
-- TOC entry 221 (class 1259 OID 24816)
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
-- TOC entry 222 (class 1259 OID 24822)
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
-- TOC entry 5176 (class 0 OID 0)
-- Dependencies: 222
-- Name: bdtma_personal_tma_idperso_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bdtma_personal_tma_idperso_seq OWNED BY public.bdtma_personal.tma_idperso;


--
-- TOC entry 223 (class 1259 OID 24823)
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
-- TOC entry 224 (class 1259 OID 24829)
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
-- TOC entry 5177 (class 0 OID 0)
-- Dependencies: 224
-- Name: bdtma_produc_tma_idprodu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bdtma_produc_tma_idprodu_seq OWNED BY public.bdtma_produc.tma_idprodu;


--
-- TOC entry 225 (class 1259 OID 24830)
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
-- TOC entry 5178 (class 0 OID 0)
-- Dependencies: 225
-- Name: COLUMN bdtma_proveed.tma_rif; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.bdtma_proveed.tma_rif IS 'rif de la empresa';


--
-- TOC entry 226 (class 1259 OID 24837)
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
-- TOC entry 5179 (class 0 OID 0)
-- Dependencies: 226
-- Name: bdtma_proveed_tma_idprove_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bdtma_proveed_tma_idprove_seq OWNED BY public.bdtma_proveed.tma_idprove;


--
-- TOC entry 247 (class 1259 OID 25012)
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
-- TOC entry 248 (class 1259 OID 25021)
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
-- TOC entry 5180 (class 0 OID 0)
-- Dependencies: 248
-- Name: cargos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cargos_id_seq OWNED BY public.cargos.id;


--
-- TOC entry 227 (class 1259 OID 24838)
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
-- TOC entry 228 (class 1259 OID 24844)
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
-- TOC entry 5181 (class 0 OID 0)
-- Dependencies: 228
-- Name: tb_balance_tb_idbalanc_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_balance_tb_idbalanc_seq OWNED BY public.tb_balance.tb_idbalanc;


--
-- TOC entry 229 (class 1259 OID 24845)
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
-- TOC entry 230 (class 1259 OID 24850)
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
-- TOC entry 5182 (class 0 OID 0)
-- Dependencies: 230
-- Name: tb_compras_tb_idcompra_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_compras_tb_idcompra_seq OWNED BY public.tb_compras.tb_idcompra;


--
-- TOC entry 231 (class 1259 OID 24851)
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
-- TOC entry 232 (class 1259 OID 24857)
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
-- TOC entry 5183 (class 0 OID 0)
-- Dependencies: 232
-- Name: tb_detcomp_tb_iddetco_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_detcomp_tb_iddetco_seq OWNED BY public.tb_detcomp.tb_iddetco;


--
-- TOC entry 233 (class 1259 OID 24858)
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
-- TOC entry 234 (class 1259 OID 24864)
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
-- TOC entry 5184 (class 0 OID 0)
-- Dependencies: 234
-- Name: tb_detvent_tb_iddetve_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_detvent_tb_iddetve_seq OWNED BY public.tb_detvent.tb_iddetve;


--
-- TOC entry 235 (class 1259 OID 24865)
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
-- TOC entry 236 (class 1259 OID 24870)
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
-- TOC entry 5185 (class 0 OID 0)
-- Dependencies: 236
-- Name: tb_invinven_tb_idinven_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_invinven_tb_idinven_seq OWNED BY public.tb_invinven.tb_idinven;


--
-- TOC entry 237 (class 1259 OID 24871)
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
-- TOC entry 238 (class 1259 OID 24876)
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
-- TOC entry 5186 (class 0 OID 0)
-- Dependencies: 238
-- Name: tb_producc_tb_idproduc_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_producc_tb_idproduc_seq OWNED BY public.tb_producc.tb_idproduc;


--
-- TOC entry 239 (class 1259 OID 24877)
-- Name: tb_reportes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_reportes (
    tb_idreport integer NOT NULL,
    tb_nombrerp character varying(255),
    tb_fechgene timestamp without time zone,
    tb_contrepo text,
    tb_generepo integer
);


ALTER TABLE public.tb_reportes OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 24883)
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
-- TOC entry 5187 (class 0 OID 0)
-- Dependencies: 240
-- Name: tb_reportes_tb_idreport_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_reportes_tb_idreport_seq OWNED BY public.tb_reportes.tb_idreport;


--
-- TOC entry 241 (class 1259 OID 24884)
-- Name: tb_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_roles (
    id integer NOT NULL,
    rol_name character varying(50) NOT NULL
);


ALTER TABLE public.tb_roles OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 24889)
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
-- TOC entry 5188 (class 0 OID 0)
-- Dependencies: 242
-- Name: tb_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_roles_id_seq OWNED BY public.tb_roles.id;


--
-- TOC entry 243 (class 1259 OID 24890)
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
-- TOC entry 244 (class 1259 OID 24906)
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
-- TOC entry 5189 (class 0 OID 0)
-- Dependencies: 244
-- Name: tb_usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_usuarios_id_seq OWNED BY public.tb_usuarios.id;


--
-- TOC entry 245 (class 1259 OID 24907)
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
-- TOC entry 246 (class 1259 OID 24912)
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
-- TOC entry 5190 (class 0 OID 0)
-- Dependencies: 246
-- Name: tb_ventas_tb_idventa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_ventas_tb_idventa_seq OWNED BY public.tb_ventas.tb_idventa;


--
-- TOC entry 4926 (class 2604 OID 25022)
-- Name: bdtma_cliente tma_idclien; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_cliente ALTER COLUMN tma_idclien SET DEFAULT nextval('public.bdtma_cliente_tma_idclien_seq'::regclass);


--
-- TOC entry 4927 (class 2604 OID 25023)
-- Name: bdtma_personal tma_idperso; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_personal ALTER COLUMN tma_idperso SET DEFAULT nextval('public.bdtma_personal_tma_idperso_seq'::regclass);


--
-- TOC entry 4928 (class 2604 OID 25024)
-- Name: bdtma_produc tma_idprodu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_produc ALTER COLUMN tma_idprodu SET DEFAULT nextval('public.bdtma_produc_tma_idprodu_seq'::regclass);


--
-- TOC entry 4929 (class 2604 OID 25025)
-- Name: bdtma_proveed tma_idprove; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_proveed ALTER COLUMN tma_idprove SET DEFAULT nextval('public.bdtma_proveed_tma_idprove_seq'::regclass);


--
-- TOC entry 4944 (class 2604 OID 25026)
-- Name: cargos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos ALTER COLUMN id SET DEFAULT nextval('public.cargos_id_seq'::regclass);


--
-- TOC entry 4930 (class 2604 OID 25027)
-- Name: tb_balance tb_idbalanc; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_balance ALTER COLUMN tb_idbalanc SET DEFAULT nextval('public.tb_balance_tb_idbalanc_seq'::regclass);


--
-- TOC entry 4931 (class 2604 OID 25028)
-- Name: tb_compras tb_idcompra; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_compras ALTER COLUMN tb_idcompra SET DEFAULT nextval('public.tb_compras_tb_idcompra_seq'::regclass);


--
-- TOC entry 4932 (class 2604 OID 25029)
-- Name: tb_detcomp tb_iddetco; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detcomp ALTER COLUMN tb_iddetco SET DEFAULT nextval('public.tb_detcomp_tb_iddetco_seq'::regclass);


--
-- TOC entry 4933 (class 2604 OID 25030)
-- Name: tb_detvent tb_iddetve; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detvent ALTER COLUMN tb_iddetve SET DEFAULT nextval('public.tb_detvent_tb_iddetve_seq'::regclass);


--
-- TOC entry 4934 (class 2604 OID 25031)
-- Name: tb_invinven tb_idinven; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_invinven ALTER COLUMN tb_idinven SET DEFAULT nextval('public.tb_invinven_tb_idinven_seq'::regclass);


--
-- TOC entry 4935 (class 2604 OID 25032)
-- Name: tb_producc tb_idproduc; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_producc ALTER COLUMN tb_idproduc SET DEFAULT nextval('public.tb_producc_tb_idproduc_seq'::regclass);


--
-- TOC entry 4936 (class 2604 OID 25033)
-- Name: tb_reportes tb_idreport; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_reportes ALTER COLUMN tb_idreport SET DEFAULT nextval('public.tb_reportes_tb_idreport_seq'::regclass);


--
-- TOC entry 4937 (class 2604 OID 25034)
-- Name: tb_roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_roles ALTER COLUMN id SET DEFAULT nextval('public.tb_roles_id_seq'::regclass);


--
-- TOC entry 4938 (class 2604 OID 25035)
-- Name: tb_usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_usuarios ALTER COLUMN id SET DEFAULT nextval('public.tb_usuarios_id_seq'::regclass);


--
-- TOC entry 4943 (class 2604 OID 25036)
-- Name: tb_ventas tb_idventa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_ventas ALTER COLUMN tb_idventa SET DEFAULT nextval('public.tb_ventas_tb_idventa_seq'::regclass);


--
-- TOC entry 5140 (class 0 OID 24809)
-- Dependencies: 219
-- Data for Name: bdtma_cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bdtma_cliente (tma_idclien, tma_nombrec, tma_direcci, tma_telefon, tma_emailcl, tma_fechreg, tma_cedula) FROM stdin;
4	jose mata	Calle vermeja, local 34	04126759712	jose@gmail.com	2025-11-18 11:18:16.500453	30056463
12	ghhgg	hghhgh	677676	ashlytorresvelandia@gmail.com	2026-01-08 16:41:59.471818	\N
10	ghhgg	hghhgh	677676	ashlytorresvelandia@gmail.com	2026-01-08 04:47:20.329584	125647858
5	Sierras Yeison	23 de enero parte baja	90938446	sierras@gmail.com	2025-11-19 02:22:31.175393	3323232
3	John Doe	Colinas de Pirineos	04245678923	jd@gmail.com	2025-11-17 23:07:17.181437	4454344
13	Marilu Rubio	Palo gordo	04265889788	marilu@gmail.com	2026-01-08 17:27:36.421329	5022276
\.


--
-- TOC entry 5142 (class 0 OID 24816)
-- Dependencies: 221
-- Data for Name: bdtma_personal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bdtma_personal (tma_idperso, tma_nombrep, tma_cargope, tma_fechcon, tma_salario, tma_telefon, tma_emailpe, tma_estadpe) FROM stdin;
1	Ashly	Jefe de cultivo	2026-01-01	1000.00	04126759712	1@gmail.com	Activo
4	Juan Diego Parra	Vendedor	2026-01-05	950.00	04126759875	as@gmail.com	Activo
6	fdfd	Asistente Administrativo	2026-01-09	6666.00	76676	ddede@gmail.com	Inactivo
8	davila	ash	2026-01-08	110011.00	112288374	as@gmail.com	Vacaciones
9	Ashly Hanneiker	Analista de Sistemas	2026-01-08	1700.00	04147109021	ddede@gmail.com	Activo
7	21121	Subgerente	2026-01-15	2000.00	333	ddede@gmail.com	Activo
\.


--
-- TOC entry 5144 (class 0 OID 24823)
-- Dependencies: 223
-- Data for Name: bdtma_produc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bdtma_produc (tma_idprodu, tma_nombrep, tma_descrip, tma_unidade, tma_preciou, tma_stockmi, tma_tipo) FROM stdin;
4	Semilla de Papa Blanca	Variedad común, ideal para freír y hervir	kg	1.40	250	insumo
5	Semilla de Papa Amarilla	Textura firme, buena para puré y guisos	kg	1.81	180	insumo
6	Fertilizante NPK 15-15-15	Fertilizante equilibrado para crecimiento de papa	kg	0.80	500	cosecha
54	1111	11	1	1.00	1	cosecha
49	Papa Mestizaw	Variedad pequeña, sabor dulce y textura suave	kg	1.50	200	insumo
55	Semilla pimenton	bolsa grande	1.5	2.50	50	insumo
2	Semilla de Papa Criolla	Variedad pequeña, sabor dulce y textura suave	kg	1.50	200	insumo
8	Manguera de riego	Manguera de 50m para riego de cultivos	unidad	20.00	50	cosecha
\.


--
-- TOC entry 5146 (class 0 OID 24830)
-- Dependencies: 225
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
-- TOC entry 5168 (class 0 OID 25012)
-- Dependencies: 247
-- Data for Name: cargos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cargos (id, nombre_cargo, descripcion, nivel, salario_base, created_at, updated_at) FROM stdin;
1	Gerente General	Responsable de la gestión general de la empresa	Directivo	2500.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
2	Subgerente	Apoya al gerente en la toma de decisiones	Directivo	2000.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
4	Contador	Responsable de la contabilidad y finanzas	Profesional	1600.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
5	Analista de Sistemas	Desarrolla y mantiene sistemas informáticos	Profesional	1700.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
6	Supervisor	Supervisa las operaciones diarias del personal	Operativo	1400.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
7	Asistente Administrativo	Apoyo en tareas administrativas	Administrativo	1000.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
8	Recepcionista	Atiende clientes y llamadas	Operativo	900.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
9	Vendedor	Encargado de ventas y atención al cliente	Operativo	950.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
10	Técnico de Soporte	Brinda soporte técnico a usuarios	Técnico	1100.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
12	Personal de Limpieza	Mantenimiento y limpieza de instalaciones	Operativo	700.00	2026-01-03 00:20:50.879958	2026-01-03 00:20:50.879958
3	Administrador	\N	Administrativo	1800.00	2026-01-03 00:20:50.879958	2026-01-08 17:30:36.185826
\.


--
-- TOC entry 5148 (class 0 OID 24838)
-- Dependencies: 227
-- Data for Name: tb_balance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_balance (tb_idbalanc, tb_fechabal, tb_tipomovi, tb_montobal, tb_describa, tb_idrefbal, tb_tiporefb) FROM stdin;
\.


--
-- TOC entry 5150 (class 0 OID 24845)
-- Dependencies: 229
-- Data for Name: tb_compras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_compras (tb_idcompra, tb_idproveed, tb_fechcomp, tb_totalcom, tb_estadcom, tb_detalle) FROM stdin;
121	28	2026-01-08	2.50	Pendiente	\N
119	28	2026-01-08	7.51	Anulada	\N
122	26	2026-01-08	1.50	Anulada	\N
\.


--
-- TOC entry 5152 (class 0 OID 24851)
-- Dependencies: 231
-- Data for Name: tb_detcomp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_detcomp (tb_iddetco, tb_idcompr, tb_idprodu, tb_cantidad, tb_precunic, tb_subtotal) FROM stdin;
350	121	55	1	2.50	2.50
357	119	2	1	1.50	1.50
358	119	4	1	1.40	1.40
359	119	4	1	1.40	1.40
360	119	5	1	1.81	1.81
361	119	4	1	1.40	1.40
362	122	2	1	1.50	1.50
\.


--
-- TOC entry 5154 (class 0 OID 24858)
-- Dependencies: 233
-- Data for Name: tb_detvent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_detvent (tb_iddetve, tb_idventa, tb_idprodu, tb_cantida, tb_precuni, tb_subtota) FROM stdin;
23	6	6	15	0.80	12.00
24	6	8	12	20.00	240.00
\.


--
-- TOC entry 5156 (class 0 OID 24865)
-- Dependencies: 235
-- Data for Name: tb_invinven; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_invinven (tb_idinven, tb_idprodu, tb_cantidis, tb_fechult) FROM stdin;
\.


--
-- TOC entry 5158 (class 0 OID 24871)
-- Dependencies: 237
-- Data for Name: tb_producc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_producc (tb_idproduc, tb_idprodut, tb_fechsiem, tb_fechcose, tb_canespel, tb_canoscoh, tb_areacult, tb_costprod, tb_idrespon) FROM stdin;
2	8	2026-01-07	2026-03-27	122.00	12299.00	122.00	1222.00	4
\.


--
-- TOC entry 5160 (class 0 OID 24877)
-- Dependencies: 239
-- Data for Name: tb_reportes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_reportes (tb_idreport, tb_nombrerp, tb_fechgene, tb_contrepo, tb_generepo) FROM stdin;
21	swws	2026-01-30 00:00:00	swswswkoo	4
20	gfggffggfwwwww	2026-01-23 00:00:00	hhhh	1
16	daño del materialhhq	2026-01-31 00:00:00	yhhyhyhyh	4
23	ggggg	2026-01-08 00:00:00	afasfsfsdfsadfs	1
\.


--
-- TOC entry 5162 (class 0 OID 24884)
-- Dependencies: 241
-- Data for Name: tb_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_roles (id, rol_name) FROM stdin;
\.


--
-- TOC entry 5164 (class 0 OID 24890)
-- Dependencies: 243
-- Data for Name: tb_usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_usuarios (id, usuario, password, nombre, apellido, email, telefono, rol, estado, created_at, updated_at, rol_id) FROM stdin;
\.


--
-- TOC entry 5166 (class 0 OID 24907)
-- Dependencies: 245
-- Data for Name: tb_ventas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_ventas (tb_idventa, tb_idclien, tb_fechvent, tb_totalven, tb_estadven) FROM stdin;
6	4	2026-01-08 19:14:41.924354	252.00	Pagada
\.


--
-- TOC entry 5191 (class 0 OID 0)
-- Dependencies: 220
-- Name: bdtma_cliente_tma_idclien_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bdtma_cliente_tma_idclien_seq', 13, true);


--
-- TOC entry 5192 (class 0 OID 0)
-- Dependencies: 222
-- Name: bdtma_personal_tma_idperso_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bdtma_personal_tma_idperso_seq', 9, true);


--
-- TOC entry 5193 (class 0 OID 0)
-- Dependencies: 224
-- Name: bdtma_produc_tma_idprodu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bdtma_produc_tma_idprodu_seq', 55, true);


--
-- TOC entry 5194 (class 0 OID 0)
-- Dependencies: 226
-- Name: bdtma_proveed_tma_idprove_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bdtma_proveed_tma_idprove_seq', 30, true);


--
-- TOC entry 5195 (class 0 OID 0)
-- Dependencies: 248
-- Name: cargos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cargos_id_seq', 14, true);


--
-- TOC entry 5196 (class 0 OID 0)
-- Dependencies: 228
-- Name: tb_balance_tb_idbalanc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_balance_tb_idbalanc_seq', 1, false);


--
-- TOC entry 5197 (class 0 OID 0)
-- Dependencies: 230
-- Name: tb_compras_tb_idcompra_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_compras_tb_idcompra_seq', 122, true);


--
-- TOC entry 5198 (class 0 OID 0)
-- Dependencies: 232
-- Name: tb_detcomp_tb_iddetco_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_detcomp_tb_iddetco_seq', 362, true);


--
-- TOC entry 5199 (class 0 OID 0)
-- Dependencies: 234
-- Name: tb_detvent_tb_iddetve_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_detvent_tb_iddetve_seq', 24, true);


--
-- TOC entry 5200 (class 0 OID 0)
-- Dependencies: 236
-- Name: tb_invinven_tb_idinven_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_invinven_tb_idinven_seq', 1, false);


--
-- TOC entry 5201 (class 0 OID 0)
-- Dependencies: 238
-- Name: tb_producc_tb_idproduc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_producc_tb_idproduc_seq', 6, true);


--
-- TOC entry 5202 (class 0 OID 0)
-- Dependencies: 240
-- Name: tb_reportes_tb_idreport_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_reportes_tb_idreport_seq', 23, true);


--
-- TOC entry 5203 (class 0 OID 0)
-- Dependencies: 242
-- Name: tb_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_roles_id_seq', 1, false);


--
-- TOC entry 5204 (class 0 OID 0)
-- Dependencies: 244
-- Name: tb_usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_usuarios_id_seq', 1, false);


--
-- TOC entry 5205 (class 0 OID 0)
-- Dependencies: 246
-- Name: tb_ventas_tb_idventa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_ventas_tb_idventa_seq', 6, true);


--
-- TOC entry 4948 (class 2606 OID 24928)
-- Name: bdtma_cliente bdtma_cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_cliente
    ADD CONSTRAINT bdtma_cliente_pkey PRIMARY KEY (tma_idclien);


--
-- TOC entry 4950 (class 2606 OID 24930)
-- Name: bdtma_personal bdtma_personal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_personal
    ADD CONSTRAINT bdtma_personal_pkey PRIMARY KEY (tma_idperso);


--
-- TOC entry 4952 (class 2606 OID 24932)
-- Name: bdtma_produc bdtma_produc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_produc
    ADD CONSTRAINT bdtma_produc_pkey PRIMARY KEY (tma_idprodu);


--
-- TOC entry 4954 (class 2606 OID 24934)
-- Name: bdtma_proveed bdtma_proveed_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bdtma_proveed
    ADD CONSTRAINT bdtma_proveed_pkey PRIMARY KEY (tma_idprove);


--
-- TOC entry 4982 (class 2606 OID 25038)
-- Name: cargos cargos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos
    ADD CONSTRAINT cargos_pkey PRIMARY KEY (id);


--
-- TOC entry 4956 (class 2606 OID 24936)
-- Name: tb_balance tb_balance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_balance
    ADD CONSTRAINT tb_balance_pkey PRIMARY KEY (tb_idbalanc);


--
-- TOC entry 4958 (class 2606 OID 24938)
-- Name: tb_compras tb_compras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_compras
    ADD CONSTRAINT tb_compras_pkey PRIMARY KEY (tb_idcompra);


--
-- TOC entry 4960 (class 2606 OID 24940)
-- Name: tb_detcomp tb_detcomp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detcomp
    ADD CONSTRAINT tb_detcomp_pkey PRIMARY KEY (tb_iddetco);


--
-- TOC entry 4962 (class 2606 OID 24942)
-- Name: tb_detvent tb_detvent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detvent
    ADD CONSTRAINT tb_detvent_pkey PRIMARY KEY (tb_iddetve);


--
-- TOC entry 4964 (class 2606 OID 24944)
-- Name: tb_invinven tb_invinven_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_invinven
    ADD CONSTRAINT tb_invinven_pkey PRIMARY KEY (tb_idinven);


--
-- TOC entry 4966 (class 2606 OID 24946)
-- Name: tb_producc tb_producc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_producc
    ADD CONSTRAINT tb_producc_pkey PRIMARY KEY (tb_idproduc);


--
-- TOC entry 4968 (class 2606 OID 24948)
-- Name: tb_reportes tb_reportes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_reportes
    ADD CONSTRAINT tb_reportes_pkey PRIMARY KEY (tb_idreport);


--
-- TOC entry 4970 (class 2606 OID 24950)
-- Name: tb_roles tb_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_roles
    ADD CONSTRAINT tb_roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4972 (class 2606 OID 24952)
-- Name: tb_roles tb_roles_rol_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_roles
    ADD CONSTRAINT tb_roles_rol_name_key UNIQUE (rol_name);


--
-- TOC entry 4974 (class 2606 OID 24954)
-- Name: tb_usuarios tb_usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_usuarios
    ADD CONSTRAINT tb_usuarios_email_key UNIQUE (email);


--
-- TOC entry 4976 (class 2606 OID 24956)
-- Name: tb_usuarios tb_usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_usuarios
    ADD CONSTRAINT tb_usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4978 (class 2606 OID 24958)
-- Name: tb_usuarios tb_usuarios_usuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_usuarios
    ADD CONSTRAINT tb_usuarios_usuario_key UNIQUE (usuario);


--
-- TOC entry 4980 (class 2606 OID 24960)
-- Name: tb_ventas tb_ventas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_ventas
    ADD CONSTRAINT tb_ventas_pkey PRIMARY KEY (tb_idventa);


--
-- TOC entry 4991 (class 2606 OID 24961)
-- Name: tb_usuarios fk_rol_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_usuarios
    ADD CONSTRAINT fk_rol_usuario FOREIGN KEY (rol_id) REFERENCES public.tb_roles(id);


--
-- TOC entry 4983 (class 2606 OID 24966)
-- Name: tb_compras tb_compras_tb_idproveed_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_compras
    ADD CONSTRAINT tb_compras_tb_idproveed_fkey FOREIGN KEY (tb_idproveed) REFERENCES public.bdtma_proveed(tma_idprove);


--
-- TOC entry 4984 (class 2606 OID 24971)
-- Name: tb_detcomp tb_detcomp_tb_idcompr_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detcomp
    ADD CONSTRAINT tb_detcomp_tb_idcompr_fkey FOREIGN KEY (tb_idcompr) REFERENCES public.tb_compras(tb_idcompra);


--
-- TOC entry 4985 (class 2606 OID 24976)
-- Name: tb_detcomp tb_detcomp_tb_idprodu_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detcomp
    ADD CONSTRAINT tb_detcomp_tb_idprodu_fkey FOREIGN KEY (tb_idprodu) REFERENCES public.bdtma_produc(tma_idprodu);


--
-- TOC entry 4986 (class 2606 OID 24981)
-- Name: tb_detvent tb_detvent_tb_idprodu_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detvent
    ADD CONSTRAINT tb_detvent_tb_idprodu_fkey FOREIGN KEY (tb_idprodu) REFERENCES public.bdtma_produc(tma_idprodu);


--
-- TOC entry 4987 (class 2606 OID 24986)
-- Name: tb_detvent tb_detvent_tb_idventa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_detvent
    ADD CONSTRAINT tb_detvent_tb_idventa_fkey FOREIGN KEY (tb_idventa) REFERENCES public.tb_ventas(tb_idventa);


--
-- TOC entry 4988 (class 2606 OID 24991)
-- Name: tb_invinven tb_invinven_tb_idprodu_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_invinven
    ADD CONSTRAINT tb_invinven_tb_idprodu_fkey FOREIGN KEY (tb_idprodu) REFERENCES public.bdtma_produc(tma_idprodu);


--
-- TOC entry 4989 (class 2606 OID 24996)
-- Name: tb_producc tb_producc_tb_idprodut_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_producc
    ADD CONSTRAINT tb_producc_tb_idprodut_fkey FOREIGN KEY (tb_idprodut) REFERENCES public.bdtma_produc(tma_idprodu);


--
-- TOC entry 4990 (class 2606 OID 25001)
-- Name: tb_producc tb_producc_tb_idrespon_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_producc
    ADD CONSTRAINT tb_producc_tb_idrespon_fkey FOREIGN KEY (tb_idrespon) REFERENCES public.bdtma_personal(tma_idperso);


--
-- TOC entry 4992 (class 2606 OID 25006)
-- Name: tb_ventas tb_ventas_tb_idclien_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_ventas
    ADD CONSTRAINT tb_ventas_tb_idclien_fkey FOREIGN KEY (tb_idclien) REFERENCES public.bdtma_cliente(tma_idclien);


-- Completed on 2026-01-08 19:23:54

--
-- PostgreSQL database dump complete
--

\unrestrict x4yP0omcoM1etaYDGL27nXzAnCaJSHYyEEiJhDr0JLFaBIP0Z9Z3szdexiLuAdP

