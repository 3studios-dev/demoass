import React, { useState } from "react";
import {
    Home, FileText, Users, Bell, BarChartBig, Menu,
    Plus, Send, Download, Smartphone, MessageCircle
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
    LineChart, Line, AreaChart, Area
} from "recharts";

/* ---------- COSTANTI & LOGO ---------- */
const COLORS = ["#4f46e5", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];
const LOGO   = '../src/unipolsai-assicurazioni-vector-logo.png';   // salva l’immagine in /public

/* ---------- DATI DEMO “SERIE A” ---------- */
const SEED_CUSTOMERS = [
    { id:"C01", name:"Alessandro Neri", email:"alessandro.neri@mail.com", phone:"347‑8214560" },
    { id:"C02", name:"Beatrice Riva",    email:"bea.riva@mail.com",        phone:"328‑9988776" },
    { id:"C03", name:"Claudio Galli",    email:"claudio.galli@mail.com",   phone:"339‑4455667" },
    { id:"C04", name:"Daniela Bassi",    email:"d.bassi@mail.com",         phone:"333‑1212121" },
    { id:"C05", name:"Edoardo Conte",    email:"edo.conte@mail.com",       phone:"392‑7766554" },
    { id:"C06", name:"Federica Sanna",   email:"fede.sanna@mail.com",      phone:"340‑9988442" },
    { id:"C07", name:"Giovanni Serra",   email:"giova.serra@mail.com",     phone:"345‑6655443" },
    { id:"C08", name:"Ilaria Vitale",    email:"ilaria.vitale@mail.com",   phone:"349‑5544332" },
    { id:"C09", name:"Lorenzo Greco",    email:"lorenzo.greco@mail.com",   phone:"331‑8877665" },
    { id:"C10", name:"Martina De Luca",  email:"martina.deluca@mail.com",  phone:"348‑1122334" }
];
const addYears = (iso,yrs)=>{ const d=new Date(iso); d.setFullYear(d.getFullYear()+yrs); return d.toISOString().split("T")[0]; };
const SEED_POLICIES = [
    { id:"P1001", customerId:"C01", type:"Auto",   start:"2023-06-15", end:addYears("2023-06-15",1), premium:480, notes:"Renault Clio 1.2" },
    { id:"P1002", customerId:"C02", type:"Casa",   start:"2024-02-10", end:addYears("2024-02-10",1), premium:350, notes:"Appartamento Milano" },
    { id:"P1003", customerId:"C03", type:"Vita",   start:"2022-12-01", end:addYears("2022-12-01",3), premium:920, notes:"Protezione famiglia" },
    { id:"P1004", customerId:"C04", type:"Salute", start:"2023-08-20", end:addYears("2023-08-20",1), premium:260, notes:"Pacchetto Silver" },
    { id:"P1005", customerId:"C05", type:"Auto",   start:"2024-04-05", end:addYears("2024-04-05",1), premium:510, notes:"Audi A3 2.0 TDI" },
    { id:"P1006", customerId:"C06", type:"Casa",   start:"2023-11-11", end:addYears("2023-11-11",1), premium:410, notes:"Villetta unifamiliare" },
    { id:"P1007", customerId:"C07", type:"Moto",   start:"2024-03-01", end:addYears("2024-03-01",1), premium:220, notes:"BMW R 1250 GS" },
    { id:"P1008", customerId:"C08", type:"Vita",   start:"2023-05-30", end:addYears("2023-05-30",5), premium:780, notes:"Long‑Term" },
    { id:"P1009", customerId:"C09", type:"Auto",   start:"2023-09-25", end:addYears("2023-09-25",1), premium:630, notes:"Tesla Model 3" },
    { id:"P1010", customerId:"C10", type:"Casa",   start:"2024-01-18", end:addYears("2024-01-18",1), premium:365, notes:"Bilocale centro" },
    { id:"P1011", customerId:"C02", type:"Salute", start:"2024-06-01", end:addYears("2024-06-01",1), premium:295, notes:"Pacchetto Gold" },
    { id:"P1012", customerId:"C04", type:"Moto",   start:"2023-07-07", end:addYears("2023-07-07",1), premium:205, notes:"Vespa GTS" },
    { id:"P1013", customerId:"C05", type:"Vita",   start:"2023-10-12", end:addYears("2023-10-12",4), premium:840, notes:"TFR integrativo" },
    { id:"P1014", customerId:"C06", type:"Auto",   start:"2022-12-20", end:addYears("2022-12-20",1), premium:470, notes:"Fiat 500X" },
    { id:"P1015", customerId:"C07", type:"Casa",   start:"2023-03-15", end:addYears("2023-03-15",1), premium:395, notes:"Loft Torino" },
    { id:"P1016", customerId:"C08", type:"Salute", start:"2024-05-22", end:addYears("2024-05-22",1), premium:310, notes:"Family Pack" },
    { id:"P1017", customerId:"C09", type:"Moto",   start:"2023-01-02", end:addYears("2023-01-02",1), premium:190, notes:"Ducati Monster" },
    { id:"P1018", customerId:"C10", type:"Vita",   start:"2022-09-09", end:addYears("2022-09-09",5), premium:990, notes:"Investimento" },
    { id:"P1019", customerId:"C01", type:"Casa",   start:"2024-07-01", end:addYears("2024-07-01",1), premium:370, notes:"Trilocale Como" },
    { id:"P1020", customerId:"C03", type:"Salute", start:"2023-11-30", end:addYears("2023-11-30",1), premium:280, notes:"Check‑up Plus" }
];

/* ---------- COMPONENTI HOME ---------- */
const Card = ({ children, className="" }) =>
    <div className={`bg-white shadow rounded-2xl p-5 ${className}`}>{children}</div>;
const KPI  = ({ label, value }) =>
    <Card><p className="text-xs text-gray-500">{label}</p><p className="text-2xl font-bold">{value}</p></Card>;
const Th   = ({ children }) => <th className="py-2 px-3 text-left text-xs uppercase font-medium">{children}</th>;
const Td   = ({ children }) => <td className="py-2 px-3 text-xs whitespace-nowrap">{children}</td>;
const Modal= ({ open, onClose, children }) =>
    open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative" onClick={e=>e.stopPropagation()}>
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-400">✕</button>
                {children}
            </div>
        </div>
    ) : null;

/* ---------- SIDEBAR hover‑expand ---------- */
function Sidebar({ page, setPage, collapsed, setCollapsed,
                     user = { name: "Mario Admin", email: "mario.admin@mail.com" } }) {

    const w    = collapsed ? "w-16" : "w-60";
    const hide = collapsed ? "hidden" : "";

    const groups = [
        { title:"Dashboard",  items:[{ key:"dashboard",      label:"Home",    icon:<Home size={16}/> }]},
        { title:"Polizze",    items:[{ key:"policies-list",  label:"Elenco",  icon:<FileText size={16}/> },
                { key:"policies-new",   label:"Nuova",   icon:<Plus size={16}/> }]},
        { title:"Clienti",    items:[{ key:"customers-list", label:"Elenco",  icon:<Users size={16}/> },
                { key:"customers-new",  label:"Nuovo",   icon:<Plus size={16}/> }]},
        { title:"Notifiche",  items:[{ key:"notifications-config",  label:"Configura", icon:<Bell size={16}/> },
                { key:"notifications-history", label:"Storico",   icon:<FileText size={16}/> }]},
        { title:"Report",     items:[{ key:"reports",        label:"Report",  icon:<BarChartBig size={16}/> }]},
    ];

    const ItemBtn = ({ it }) => (
        <button
            onClick={()=>setPage(it.key)}
            className={`flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-slate-100 ${
                page===it.key ? "bg-slate-100 font-medium" : ""
            }`}
            title={collapsed ? it.label : undefined}
        >
            {it.icon}
            <span className={`${hide} text-sm truncate`}>{it.label}</span>
        </button>
    );

    return (
        <aside className={`${w} bg-white shadow-lg h-full flex flex-col transition-all duration-200`}>
            {/* top: logo + stesso bottone toggle (opzionale) */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <img src={LOGO} alt="logo" />
                </div>
            </div>

            {/* nav */}
            <nav className="flex-1 overflow-y-auto space-y-3 px-2 py-4">
                {groups.map(g=>(
                    <div key={g.title} className="space-y-1">
                        <p className={`${hide} text-[11px] font-semibold text-gray-400 px-2 uppercase tracking-wide`}>
                            {g.title}
                        </p>
                        {g.items.map(it=> <ItemBtn key={it.key} it={it}/>)}
                    </div>
                ))}
            </nav>

            {/* utente */}
            <footer className="border-t border-slate-100 p-3 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shrink-0">
                    {user.name.slice(0,2).toUpperCase()}
                </div>
                <div className={`${hide}`}>
                    <p className="text-xs font-medium leading-none">{user.name}</p>
                    <p className="text-[10px] text-gray-500 leading-none">{user.email}</p>
                </div>
            </footer>
        </aside>
    );
}

/* ---------- DASHBOARD ---------- */
function Dashboard({ policies, customers }) {
    const now       = new Date();
    const exp30     = policies.filter(p=>new Date(p.end)-now<=30*864e5 && new Date(p.end)>now).length;
    const totPrem   = policies.reduce((s,p)=>s+p.premium,0);
    const avgPrem   = (totPrem / policies.length).toFixed(0);

    const typeCount = Object.entries(policies.reduce((a,p)=>({...a,[p.type]:(a[p.type]||0)+1}),{}))
        .map(([type,count])=>({type,count}));
    const barPrem   = typeCount.map(t=>({type:t.type, premium: policies.filter(p=>p.type===t.type).reduce((s,p)=>s+p.premium,0)}));
    const sorted    = [...policies].sort((a,b)=>new Date(a.end)-new Date(b.end));

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <KPI label="Polizze" value={policies.length}/>
                <KPI label="Clienti" value={customers.length}/>
                <KPI label="Scadenze 30 gg" value={exp30}/>
                <KPI label="Premi (€)" value={totPrem}/>
                <KPI label="Premio medio" value={avgPrem}/>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Conteggio per Tipo */}
                <Card className="h-80">
                    <h3 className="font-semibold mb-2">Conteggio per Tipo</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={typeCount} layout="vertical" margin={{left:20}}>
                            <XAxis type="number" allowDecimals={false}/>
                            <YAxis dataKey="type" type="category" width={80}/>
                            <Tooltip/>
                            <Bar dataKey="count">
                                {typeCount.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Premi per Tipo */}
                <Card className="h-80">
                    <h3 className="font-semibold mb-2">Premi per Tipo (€)</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={barPrem}>
                            <XAxis dataKey="type"/><YAxis allowDecimals={false}/><Tooltip/>
                            <Bar dataKey="premium">
                                {barPrem.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Prossime scadenze */}
                <Card className="h-80">
                    <h3 className="font-semibold mb-2">Prossime scadenze</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart data={sorted.slice(0,12)}>
                            <XAxis dataKey="id" hide/><YAxis allowDecimals={false}/><Tooltip/>
                            <Line type="monotone" dataKey="premium" stroke="#ef4444" strokeWidth={2}/>
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Tabella scadenze */}
            <Card className="p-0 overflow-x-auto">
                <h3 className="font-semibold text-sm px-4 pt-4">Polizze (ordine scadenza)</h3>
                <table className="w-full text-xs">
                    <thead className="bg-slate-100">
                    <tr><Th>#</Th><Th>Cliente</Th><Th>Tipo</Th><Th>Fine</Th><Th>Premio</Th></tr>
                    </thead>
                    <tbody>
                    {sorted.map(p=>{
                        const c=customers.find(x=>x.id===p.customerId);
                        return (
                            <tr key={p.id} className="hover:bg-slate-50">
                                <Td>{p.id}</Td><Td>{c?.name}</Td><Td>{p.type}</Td><Td>{p.end}</Td><Td>{p.premium} €</Td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}

/* ---------- REPORTS ---------- */
function Reports({ policies }) {
    const [gran, setGran] = useState("month");
    const [year, setYear] = useState(new Date().getFullYear());
    const keyOf = d =>
        gran==="year"  ? d.getFullYear() :
            gran==="month" ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}` :
                gran==="week"  ? `${d.getFullYear()}-W${String(Math.ceil((d.getDate()-d.getDay()+1)/7)).padStart(2,"0")}` :
                    d.toISOString().split("T")[0];

    const filtered = policies.filter(p=>gran==="year" || new Date(p.start).getFullYear()===year);
    const grouped  = filtered.reduce((a,p)=>{const k=keyOf(new Date(p.start)); a[k]=(a[k]||0)+p.premium; return a;},{});
    const rows     = Object.entries(grouped).sort().map(([period,value])=>({period,value}));

    const years = [...new Set(policies.map(p=>new Date(p.start).getFullYear()))];
    const csv   = ["periodo,premio", ...rows.map(r=>`${r.period},${r.value}`)].join("\n");
    const downloadCSV = ()=>{
        const blob=new Blob([csv],{type:"text/csv"});
        const url=URL.createObjectURL(blob);
        const a=document.createElement("a"); a.href=url; a.download=`report_${gran}_${year}.csv`; a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            {/* controlli */}
            <div className="flex flex-wrap items-center gap-3">
                {["year","month","week","day"].map(k=>(
                    <button key={k} onClick={()=>setGran(k)}
                            className={`px-3 py-1 text-xs rounded-xl ${gran===k?"bg-indigo-600 text-white":"bg-slate-100"}`}>
                        {{year:"Annuale",month:"Mensile",week:"Settimanale",day:"Giornaliero"}[k]}
                    </button>
                ))}
                {gran!=="year" && (
                    <select value={year} onChange={e=>setYear(+e.target.value)} className="border rounded-md text-xs px-2 py-1">
                        {years.map(y=><option key={y} value={y}>{y}</option>)}
                    </select>
                )}
                <div className="ml-auto">
                    <button onClick={downloadCSV} className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1 rounded-xl text-xs">
                        <Download size={14}/> CSV
                    </button>
                </div>
            </div>

            {/* grafico */}
            <Card className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={rows}>
                        <XAxis dataKey="period" hide={rows.length>30}/>
                        <YAxis allowDecimals={false}/><Tooltip/>
                        <Area type="monotone" dataKey="value" stroke="#4f46e5" fill="#6366f140" strokeWidth={2}/>
                    </AreaChart>
                </ResponsiveContainer>
            </Card>

            {/* tabella */}
            <Card className="p-0 overflow-x-auto">
                <table className="w-full text-xs">
                    <thead className="bg-slate-100"><tr><Th>Periodo</Th><Th>Premi (€)</Th></tr></thead>
                    <tbody>{rows.map(r=><tr key={r.period}><Td>{r.period}</Td><Td>{r.value}</Td></tr>)}</tbody>
                </table>
                {!rows.length && <p className="p-4 text-center text-sm text-gray-500">Nessun dato…</p>}
            </Card>
        </div>
    );
}

/* ---------- CLIENTI ---------- */
function CustomerTable({ customers, filter, onSelect }) {
    const list = customers.filter(c=>c.name.toLowerCase().includes(filter.toLowerCase()) || c.email.includes(filter));
    return (
        <Card className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-slate-100 text-xs"><tr><Th>Nome</Th><Th>Email</Th><Th>Telefono</Th></tr></thead>
                <tbody>
                {list.map(c=>(
                    <tr key={c.id} className="hover:bg-slate-50 cursor-pointer" onClick={()=>onSelect(c)}>
                        <Td>{c.name}</Td><Td>{c.email}</Td><Td>{c.phone}</Td>
                    </tr>
                ))}
                </tbody>
            </table>
            {!list.length && <p className="p-4 text-center text-sm text-gray-500">Nessun cliente…</p>}
        </Card>
    );
}
function CustomerForm({ onAdd }) {
    const [open,setOpen]=useState(false);
    const [form,setForm]=useState({name:"",email:"",phone:""});
    const handle=(k,v)=>setForm(f=>({...f,[k]:v}));
    const save=()=>{
        if(!form.name) return;
        onAdd({ id:`C${Date.now()}`, ...form });
        setForm({name:"",email:"",phone:""});
        setOpen(false);
    };
    return (
        <>
            <button onClick={()=>setOpen(true)} className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs">
                <Plus size={14}/> Nuovo Cliente
            </button>
            <Modal open={open} onClose={()=>setOpen(false)}>
                <h2 className="text-lg font-semibold mb-4">Nuovo Cliente</h2>
                {["name","email","phone"].map(k=>(
                    <div key={k} className="mb-2">
                        <label className="text-sm capitalize">{k}</label>
                        <input value={form[k]} onChange={e=>handle(k,e.target.value)} className="border rounded-md w-full px-2 py-1 text-sm"/>
                    </div>
                ))}
                <div className="flex justify-end gap-3 pt-3">
                    <button onClick={()=>setOpen(false)} className="text-sm">Annulla</button>
                    <button onClick={save} className="bg-indigo-600 text-white px-4 py-1 rounded-lg text-sm">Salva</button>
                </div>
            </Modal>
        </>
    );
}

/* ---------- POLIZZE ---------- */
function PolicyTable({ policies, customers, filter, onSelect }) {
    const list = policies.filter(p=>{
        const c=customers.find(x=>x.id===p.customerId);
        return p.id.includes(filter) || c?.name.toLowerCase().includes(filter.toLowerCase());
    });
    return (
        <Card className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-slate-100 text-xs">
                <tr><Th>#</Th><Th>Cliente</Th><Th>Tipo</Th><Th>Inizio</Th><Th>Fine</Th><Th>Premio</Th></tr>
                </thead>
                <tbody>
                {list.map(p=>{
                    const c=customers.find(x=>x.id===p.customerId);
                    return (
                        <tr key={p.id} className="hover:bg-slate-50 cursor-pointer" onClick={()=>onSelect(p)}>
                            <Td>{p.id}</Td><Td>{c?.name}</Td><Td>{p.type}</Td><Td>{p.start}</Td><Td>{p.end}</Td><Td>{p.premium} €</Td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            {!list.length && <p className="p-4 text-center text-sm text-gray-500">Nessuna polizza…</p>}
        </Card>
    );
}
function PolicyForm({ customers, onAddCustomer, onAddPolicy }) {
    const [open,setOpen]=useState(false);
    const empty={ id:"",type:"Auto",start:"",end:"",premium:"",notes:"",customerId:"" };
    const [form,setForm]=useState(empty);
    const [newC,setNewC]=useState({name:"",email:"",phone:""});
    const opts=[...customers,{id:"NEW",name:"+ Nuovo Cliente"}];

    const handle=(k,v)=>setForm(f=>({...f,[k]:v}));
    const save=()=>{
        let cid=form.customerId;
        if(cid==="NEW"){
            if(!newC.name) return;
            const c={id:`C${Date.now()}`,...newC};
            onAddCustomer(c); cid=c.id;
        }
        if(!form.id||!cid||!form.start||!form.end) return;
        onAddPolicy({...form, customerId:cid, premium:Number(form.premium||0)});
        setForm(empty); setNewC({name:"",email:"",phone:""}); setOpen(false);
    };

    return (
        <>
            <button onClick={()=>setOpen(true)} className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs">
                <Plus size={14}/> Nuova Polizza
            </button>
            <Modal open={open} onClose={()=>setOpen(false)}>
                <h2 className="text-lg font-semibold mb-4">Nuova Polizza</h2>
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                    <div className="space-y-1"><label className="text-sm">Numero</label><input value={form.id} onChange={e=>handle("id",e.target.value)} className="border rounded-md w-full px-2 py-1 text-sm"/></div>
                    <div className="space-y-1"><label className="text-sm">Cliente</label>
                        <select value={form.customerId} onChange={e=>handle("customerId",e.target.value)} className="border rounded-md w-full px-2 py-1 text-sm">
                            <option value="">Seleziona…</option>
                            {opts.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    {form.customerId==="NEW" && ["name","email","phone"].map(k=>(
                        <div key={k} className="space-y-1"><label className="text-sm capitalize">{k}</label>
                            <input value={newC[k]} onChange={e=>setNewC(n=>({...n,[k]:e.target.value}))} className="border rounded-md w-full px-2 py-1 text-sm"/>
                        </div>
                    ))}
                    <div className="grid sm:grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-sm">Tipo</label><select value={form.type} onChange={e=>handle("type",e.target.value)} className="border rounded-md w-full px-2 py-1 text-sm">
                            <option>Auto</option><option>Casa</option><option>Vita</option><option>Salute</option><option>Moto</option>
                        </select></div>
                        <div className="space-y-1"><label className="text-sm">Premio (€)</label><input type="number" value={form.premium} onChange={e=>handle("premium",e.target.value)} className="border rounded-md w-full px-2 py-1 text-sm"/></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-sm">Inizio</label><input type="date" value={form.start} onChange={e=>handle("start",e.target.value)} className="border rounded-md w-full px-2 py-1 text-sm"/></div>
                        <div className="space-y-1"><label className="text-sm">Fine</label><input type="date" value={form.end} onChange={e=>handle("end",e.target.value)} className="border rounded-md w-full px-2 py-1 text-sm"/></div>
                    </div>
                    <div className="space-y-1"><label className="text-sm">Note</label><textarea rows={3} value={form.notes} onChange={e=>handle("notes",e.target.value)} className="border rounded-md w-full px-2 py-1 text-sm"/></div>
                </div>
                <div className="flex justify-end gap-3 pt-3">
                    <button onClick={()=>setOpen(false)} className="text-sm">Annulla</button>
                    <button onClick={save} className="bg-indigo-600 text-white px-4 py-1 rounded-lg text-sm">Salva</button>
                </div>
            </Modal>
        </>
    );
}

/* ---------- NOTIFICHE ---------- */
function NotificationsConfig({ config, setConfig }) {
    return (
        <Card className="space-y-4 max-w-lg">
            <h3 className="font-semibold text-lg">Configurazione Notifiche</h3>
            <div className="space-y-1"><label className="text-sm">Giorni prima scadenza</label>
                <input type="number" value={config.days} onChange={e=>setConfig(c=>({...c,days:Number(e.target.value)}))}
                       className="border rounded-md w-full px-2 py-1 text-sm"/>
            </div>
            <div className="space-y-1"><label className="text-sm">Canali</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={config.whatsapp} onChange={()=>setConfig(c=>({...c,whatsapp:!c.whatsapp}))}/><Smartphone size={14}/>WhatsApp</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={config.sms} onChange={()=>setConfig(c=>({...c,sms:!c.sms}))}/><MessageCircle size={14}/>SMS</label>
            </div>
            <div className="space-y-1"><label className="text-sm">Template</label>
                <textarea rows={4} value={config.template} onChange={e=>setConfig(c=>({...c,template:e.target.value}))}
                          className="border rounded-md w-full p-2 text-sm"/>
            </div>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs">
                <Send size={14}/> Salva demo
            </button>
        </Card>
    );
}
function NotificationsHistory({ history, setHistory }) {
    const [filter,setFilter]=useState("");
    const sendTest=()=>setHistory(h=>[...h,{date:new Date().toLocaleDateString(),policy:"Test",channel:h.length%2?"WhatsApp":"SMS"}]);
    const list = history.filter(h=>h.policy.includes(filter));
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Storico invii</h3>
                <button onClick={sendTest} className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs"><Send size={14}/> Test</button>
            </div>
            <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Cerca…"
                   className="border rounded-xl px-3 py-2 text-sm w-full max-w-xs"/>
            <Card className="p-0">
                <table className="w-full text-xs">
                    <thead className="bg-slate-100"><tr><Th>Data</Th><Th>Polizza</Th><Th>Canale</Th></tr></thead>
                    <tbody>
                    {list.map((h,i)=><tr key={i}><Td>{h.date}</Td><Td>{h.policy}</Td><Td>{h.channel}</Td></tr>)}
                    </tbody>
                </table>
                {!history.length && <p className="p-4 text-center text-sm text-gray-500">Nessuna notifica…</p>}
            </Card>
        </div>
    );
}

/* ---------- APP ROOT ---------- */
export default function App() {
    const [page,setPage]   = useState("dashboard");
    const [customers,setCustomers] = useState(SEED_CUSTOMERS);
    const [policies,setPolicies]   = useState(SEED_POLICIES);
    const [filter,setFilter]       = useState("");
    const [selPol,setSelPol]       = useState(null);
    const [selCus,setSelCus]       = useState(null);
    const [notifConfig,setNotifConfig] = useState({ days:30, whatsapp:true, sms:false, template:"Ciao {{nome}}, la tua polizza {{numero}} scade il {{scadenza}}." });
    const [notifHist,setNotifHist] = useState([]);
    const [collapsed,setCollapsed] = useState(false);   //  ⬅️  NUOVO


    /* helper mutazioni */
    const addCustomer = c => setCustomers(cs=>[...cs,c]);
    const addPolicy   = p => setPolicies(ps=>[...ps,p]);

    return (
        <div className="flex h-screen bg-gray-50 text-gray-800">
            <Sidebar
                 page={page}
                 setPage={setPage}
                 collapsed={collapsed}
                 setCollapsed={setCollapsed}
              />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* header */}
                <header className="h-14 bg-white shadow flex items-center gap-3 px-4">
                    {/* pulsante: mostra sempre, anche su desktop */}
                    <button
                        onClick={()=>setCollapsed(!collapsed)}
                        className="p-2 rounded-md hover:bg-slate-100"
                        title={collapsed ? "Apri menu" : "Chiudi menu"}
                    >
                        <Menu size={20}/>
                    </button>

                    <h1 className="font-semibold truncate">
                        {({dashboard:"Dashboard",
                            "policies-list":"Polizze",
                            "policies-new":"Nuova Polizza",
                            "customers-list":"Clienti",
                            "customers-new":"Nuovo Cliente",
                            "notifications-config":"Configura Notifiche",
                            "notifications-history":"Storico Notifiche",
                            reports:"Report"})[page]||"AssiGest"}
                    </h1>
                </header>


                {/* main */}
                <main className="flex-1 overflow-y-auto p-6 space-y-6">
                    {page==="dashboard"            && <Dashboard policies={policies} customers={customers}/>}

                    {page==="customers-list"       && (
                        <>
                            <div className="flex justify-between items-center">
                                <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Cerca…" className="border rounded-xl px-3 py-2 text-sm w-full max-w-xs"/>
                                <CustomerForm onAdd={addCustomer}/>
                            </div>
                            <CustomerTable customers={customers} filter={filter} onSelect={setSelCus}/>
                        </>
                    )}
                    {page==="customers-new"        && <CustomerForm onAdd={addCustomer}/>}

                    {page==="policies-list"        && (
                        <>
                            <div className="flex justify-between items-center">
                                <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Cerca…" className="border rounded-xl px-3 py-2 text-sm w-full max-w-xs"/>
                                <PolicyForm customers={customers} onAddCustomer={addCustomer} onAddPolicy={addPolicy}/>
                            </div>
                            <PolicyTable policies={policies} customers={customers} filter={filter} onSelect={setSelPol}/>
                        </>
                    )}
                    {page==="policies-new"         && <PolicyForm customers={customers} onAddCustomer={addCustomer} onAddPolicy={addPolicy}/>}

                    {page==="notifications-config" && <NotificationsConfig config={notifConfig} setConfig={setNotifConfig}/>}
                    {page==="notifications-history"&& <NotificationsHistory history={notifHist} setHistory={setNotifHist}/>}

                    {page==="reports"              && <Reports policies={policies}/>}
                </main>
            </div>

            {/* modali dettaglio */}
            <Modal open={!!selPol} onClose={()=>setSelPol(null)}>
                {selPol && (
                    <div className="space-y-2 text-sm">
                        <h2 className="text-lg font-semibold mb-2">Dettaglio {selPol.id}</h2>
                        <p><b>Cliente:</b> {customers.find(c=>c.id===selPol.customerId)?.name}</p>
                        <p><b>Tipo:</b> {selPol.type}</p>
                        <p><b>Periodo:</b> {selPol.start} ➜ {selPol.end}</p>
                        <p><b>Premio:</b> {selPol.premium} €</p>
                        <p><b>Note:</b> {selPol.notes}</p>
                    </div>
                )}
            </Modal>
            <Modal open={!!selCus} onClose={()=>setSelCus(null)}>
                {selCus && (
                    <div className="space-y-2 text-sm">
                        <h2 className="text-lg font-semibold mb-2">{selCus.name}</h2>
                        <p><b>Email:</b> {selCus.email}</p>
                        <p><b>Telefono:</b> {selCus.phone}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
