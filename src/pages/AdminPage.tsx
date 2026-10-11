import React from 'react';
import { useLocation } from 'react-router-dom';
import { AdminLayout } from '../components/admin/AdminLayout';
import { AdminDashboardHome } from '../components/admin/AdminDashboardHome';
import { AdminProducts } from '../components/admin/AdminProducts';
import { AdminCategories } from '../components/admin/AdminCategories';
import { AdminOrders } from '../components/admin/AdminOrders';
import { AdminCustomers } from '../components/admin/AdminCustomers';
import { AdminCustomRequests } from '../components/admin/AdminCustomRequests';
import { AdminInventory } from '../components/admin/AdminInventory';
import { AdminCoupons } from '../components/admin/AdminCoupons';
import { AdminReviews } from '../components/admin/AdminReviews';
import { AdminTestimonials } from '../components/admin/AdminTestimonials';
import { AdminCMS } from '../components/admin/AdminCMS';
import { AdminSettings } from '../components/admin/AdminSettings';

export const AdminPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const renderAdminModule = () => {
    if (path === '/admin/products') return <AdminProducts />;
    if (path === '/admin/categories') return <AdminCategories />;
    if (path === '/admin/orders') return <AdminOrders />;
    if (path === '/admin/customers') return <AdminCustomers />;
    if (path === '/admin/custom-requests') return <AdminCustomRequests />;
    if (path === '/admin/inventory') return <AdminInventory />;
    if (path === '/admin/coupons') return <AdminCoupons />;
    if (path === '/admin/reviews') return <AdminReviews />;
    if (path === '/admin/testimonials') return <AdminTestimonials />;
    if (path === '/admin/cms') return <AdminCMS />;
    if (path === '/admin/settings') return <AdminSettings />;
    return <AdminDashboardHome />;
  };

  return (
    <AdminLayout>
      {renderAdminModule()}
    </AdminLayout>
  );
};
