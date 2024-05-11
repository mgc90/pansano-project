import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css'

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';



import axios from 'axios';






export default function ClientesList() {
    let emptyclient = {
        id: null,
        creationDate: "",
        name: '',
        price: 0,
        img: "",
        quanty: 1,
        description: '',
       
    };

    const [clients, setclients] = useState(null);
    const [clientDialog, setclientDialog] = useState(false);
    const [deleteclientDialog, setDeleteclientDialog] = useState(false);
    const [deleteclientsDialog, setDeleteclientsDialog] = useState(false);
    const [client, setclient] = useState(emptyclient);
    const [selectedclients, setSelectedclients] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    /*HOOK PARA LLAMAR clientS DESDE EL SERVER DJANGO */
    /*useEffect(() => {
        getAllclients().then((res) => setclients(res.data));
      }, []);*/

      /*HOOK PARA LLAMAR CLIENTES DESDE JSON LOCAL */
      useEffect(() => {
        axios("ejemploClientes.json").then((res) => setclients(res.data));
    }, []);

   

    const openNew = () => {
        setclient(emptyclient);
        setSubmitted(false);
        setclientDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setclientDialog(false);
    };

    const hideDeleteclientDialog = () => {
        setDeleteclientDialog(false);
    };

    const hideDeleteclientsDialog = () => {
        setDeleteclientsDialog(false);
    };

    const saveclient = () => {
        setSubmitted(true);

        if (client.name.trim()) {
            let _clients = [...clients];
            let _client = { ...client };

            if (client.id) {
                const index = findIndexById(client.id);
                /* HERE IS THE API FUNCTION TO UPDATE client */
                //updatecliente(client.id, client)
                console.log(client)
                _clients[index] = _client;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'client Updated', life: 3000 });
            } else {
                /**HERE IS imported function for axios's connection with API, createclient */
                 //createclient(client);

                _client.img = 'client-placeholder.svg';
                _clients.push(_client);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'client Created', life: 3000 });
            }

            setclients(_clients);
            setclientDialog(false);
            setclient(emptyclient);
            
        }
        
    };

    const editclient = (client) => {
        setclient({ ...client });
        setclientDialog(true);
    };

    const confirmDeleteclient = (client) => {
        setclient(client);
        setDeleteclientDialog(true);
    };

    const deleteclient = () => {
        let _clients = clients.filter((val) => val.id !== client.id);

        setclients(_clients);
        
        /*llamado a la funcion de api para borrar desde boton individual*/
        deleteclient(client.id);
        
        setDeleteclientDialog(false);
        setclient(emptyclient);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'client Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < clients.length; i++) {
            if (clients[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

 
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteclientsDialog(true);
        
    };

    const deleteSelectedclients = () => {
        let _clients = clients.filter((val) => !selectedclients.includes(val));

        setclients(_clients);

        /*ACA ES PARA BORRAR EL SELECCIONADO DESDE EL BOTÓN DELETE AL LADO DEL NEW. debo reparar para borrar de a varios */
        selectedclients.map(item => deleteclient(item.id));

        setDeleteclientsDialog(false);
        setSelectedclients(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'clients Deleted', life: 3000 });
    };

    

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _client = { ...client };

        _client[`${name}`] = val;

        setclient(_client);
    };

  

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Nuevo" icon="pi pi-plus" severity="success" onClick={openNew} className="new" />
                <Button label="Borrar" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} className="delete" disabled={!selectedclients || !selectedclients.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    /*const imageBodyTemplate = (rowData) => {
        return <img src={`${rowData.img}`} alt={rowData.img} className="shadow-2" style={{ width: '3rem', height: '3rem' }} />;
    };*/

 
 
   
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editclient(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteclient(rowData)} />
            </React.Fragment>
        );
    };

  

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Clientes</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );
    const clientDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveclient} />
        </React.Fragment>
    );
    const deleteclientDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteclientDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteclient} />
        </React.Fragment>
    );
    const deleteclientsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteclientsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedclients} />
        </React.Fragment>
    );

    return (
        <div className="totalComponent">
            <Toast ref={toast} />
            <div className="card" >
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={clients} selection={selectedclients} onSelectionChange={(e) => setSelectedclients(e.value) } 
                        reorderableColumns reorderableRows onRowReorder={(e) => setclients(e.value)}  //responsiveLayout="stack" breakpoint='600px'
                        dataKey="id"  paginator rows={25} rowsPerPageOptions={[5, 10, 25, 50]} key={client.id} fit="true" showGridlines="true"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} clients" globalFilter={globalFilter} header={header} 
                        className={"responsiveHeaders"}
                        >
                            
                    
                    <Column  key="seleccionar" columnKey='seleccionar' headerClassName="hidden-header" selectionMode="multiple" exportable={false} className='Seleccionar' ></Column>
                    <Column field="id"  header="ID" sortable key="id" className="ID" columnKey="id" ></Column>
                    <Column field="name" header="Nombre" sortable key="name" className="Nombre" columnKey="name" ></Column>
                    <Column field='lastName' header="Apellido" sortable key="Apellido" className='Apellido' columnKey='Apellido' ></Column>
                    <Column field='tel' header="Teléfono"  headerClassName="hidden-header" key="tel" className='Teléfono' columnKey='tel' ></Column>
                    <Column field='location' header="Localidad" sortable key="location" className='Localidad' columnKey='location' ></Column>
                    <Column field='adress' header="Dirección" sortable key="adress" className='Dirección' columnKey='adress' ></Column>
                    <Column field='ubication' header="Ubicación" headerClassName="hidden-header" key="ubication" className='Ubicación' columnKey='ubication' ></Column>
                    <Column field='email' header="Email" headerClassName="hidden-header" key="email" className='Email' columnKey='email' ></Column>
                    <Column field='password' header="Contraseña" headerClassName="hidden-header" key="password" className='Constraseña' columnKey='password' ></Column>
                    {/*<Column field="img" columnKey='imagen' header="Imagen" key="imagen" headerClassName="hidden-header" className="Imagen" body={imageBodyTemplate} ></Column>*/}
                    
                    <Column className="Editar" headerClassName="hidden-header" header="Editar" key="editar" columnKey='editar' body={actionBodyTemplate} exportable={false} ></Column>
                    <Column headerClassName="hidden-header" header="Mover"   columnKey='mover' rowReorder className='Mover' > </Column>
                    
                </DataTable>
            </div>

            <Dialog visible={clientDialog} style={{ width: '30rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="client Details" modal className="p-fluid" footer={clientDialogFooter} onHide={hideDialog}>
                {/*<div className="field">
                    <label htmlFor="img" className="font-bold">
                        Imagen
                    </label>
                    {client.img && <img src={`${client.img}`} style={{ width: '15rem', height: '15rem' }} alt={client.img} className="client-image block m-auto pb-3" />}
                    <div style={{display: 'flex'}}>
                        <input type="hidden" id="img" value={client.img} onChange={(e) => onInputChange(e, 'img')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.img })} style={{ width: '20rem'}} />
                        <FileUpload  filenameelement={client.img} mode="basic" name="demo[]" url="/public/imgs" accept="image/*" maxFileSize={1000000} /> 
                    </div>
                    
                    
                    
                    {submitted && !client.img && <small className="p-error">Image is required.</small>}
                </div>*/}

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nombre
                    </label>
                    <InputText id="name" value={client.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.name })} />
                    {submitted && !client.name && <small className="p-error">Nombre es requerido.</small>}
                </div>
                
                <div className="field">
                    <label htmlFor="lastName" className="font-bold">
                        Apellido
                    </label>
                    <InputText id="lastName" value={client.lastName} onChange={(e) => onInputChange(e, 'lastName')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.lastName })} />
                    {submitted && !client.LastName && <small className="p-error">Apellido es requerido.</small>}
                </div>

                <div className="field">
                    <label htmlFor="tel" className="font-bold">
                        Teléfono
                    </label>
                    <InputText id="tel" value={client.tel} onChange={(e) => onInputChange(e, 'tel')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.tel })} />
                    {submitted && !client.tel && <small className="p-error">Teléfono es requerida.</small>}
                </div>

                <div className="field">
                    <label htmlFor="adress" className="font-bold">
                        Dirección
                    </label>
                    <InputText id="adress" value={client.adress} onChange={(e) => onInputChange(e, 'adress')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.adress })} />
                    {submitted && !client.adress && <small className="p-error">Dirección es requerida.</small>}
                </div>

                <div className="field">
                    <label htmlFor="ubication" className="font-bold">
                        Ubicación
                    </label>
                    <InputText id="ubication" value={client.ubication} onChange={(e) => onInputChange(e, 'ubication')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.ubication })} />
                    {submitted && !client.ubication && <small className="p-error">Ubicación es requerida.</small>}
                </div>

                <div className="field">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <InputText id="email" value={client.tel} onChange={(e) => onInputChange(e, 'Email')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.email })} />
                    {submitted && !client.email && <small className="p-error">Email es requerido.</small>}
                </div>

                <div className="field">
                    <label htmlFor="password" className="font-bold">
                        Contraseña
                    </label>
                    <InputText id="password" value={client.password} onChange={(e) => onInputChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.password })} />
                    {submitted && !client.password && <small className="p-error">Contraseña es requerida.</small>}
                </div>
                
            </Dialog>

            <Dialog visible={deleteclientDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteclientDialogFooter} onHide={hideDeleteclientDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {client && (
                        <span>
                            ¿Seguro desea borrar a <b>{client.name + " " + client.lastName}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteclientsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteclientsDialogFooter} onHide={hideDeleteclientsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {client && <span>¿Está seguro de borrar al cliente seleccionado?</span>}
                </div>
            </Dialog>
        </div>
    );
}
        