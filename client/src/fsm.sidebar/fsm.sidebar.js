import React from 'react';
import './sb-admin-2.min.css';

export default class FsmSidebar extends React.Component {
    render() {
        return (
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <a class="sidebar-brand d-flex align-items-center justify-content-center">
                    <div class="sidebar-brand-text mx-3">Flowers Management</div>
                </a>
                <hr class="sidebar-divider my-0" />
                <li class="nav-item active">
                    <a class="nav-link" href="index.html">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>
                <hr class="sidebar-divider" />
                <div class="sidebar-heading">Flowers</div>
                <li class="nav-item active">
                    <a class="nav-link" href="index.html">
                    <i class="fas fa-fw fa-cog"></i>
                        <span>Add Flowrs</span></a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="index.html">
                    <i class="fas fa-fw fa-wrench"></i>
                        <span>My Flowers</span></a>
                </li>
                <hr class="sidebar-divider" />
                <div class="sidebar-heading">All Flowers</div>
                <li class="nav-item active">
                    <a class="nav-link" href="index.html">
                    <i class="fas fa-fw fa-folder"></i>
                        <span>Customers</span></a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="index.html">
                    <i class="fas fa-fw fa-chart-area"></i>
                        <span>Charts</span></a>
                </li>
                <hr class="sidebar-divider d-none d-md-block" />
                <div class="text-center d-none d-md-inline">
                    <button class="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </ul>
        )
    }
}