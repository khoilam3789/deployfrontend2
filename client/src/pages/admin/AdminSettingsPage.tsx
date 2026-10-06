import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import type { SiteSettings } from '../../types';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    storeName: 'Cửa Hàng Vải Thun Tiến Phát Đạt',
    tagline: 'Chuyên Cung Cấp Sỉ & Lẻ Vải Thun May Mặc Toàn Quốc',
    hotline1: '0938.591.207',
    hotline2: '0937.116.704',
    zalo: '0938.591.207',
    email: 'vaithuntienphatdat@gmail.com',
    address: '33 Lê Cảnh Tuân, P. Phú Thọ Hòa, Q. Tân Phú, TP. Hồ Chí Minh',
    workingHours: '07:30 - 18:00 (Thứ 2 - Thứ 7)',
    aboutShort: 'Tiến Phát Đạt là một trong những đơn vị phân phối nguồn vải thun may mặc uy tín tại TP.HCM...',
    logo: '/images/logo/logo.png'
  });

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const token = localStorage.getItem('tpd_admin_token');

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data) {
          setSettings(d.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: 'Đã lưu cấu hình website thành công!' });
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Lỗi lưu cấu hình' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Lỗi kết nối máy chủ' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-base font-black uppercase tracking-wider text-gray-900">
          Cài Đặt Thông Tin Doanh Nghiệp
        </h2>
        <p className="text-xs text-gray-500">
          Thông tin hotline, địa chỉ kho, email và thông điệp hiển thị trên toàn bộ website
        </p>
      </div>

      {statusMsg && (
        <div
          className={`p-3 text-xs rounded flex items-center gap-2 ${
            statusMsg.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white border border-gray-200 p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Tên cửa hàng / Doanh nghiệp
            </label>
            <input
              type="text"
              required
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Khẩu hiệu (Tagline)
            </label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Hotline 1 (Chính)
            </label>
            <input
              type="text"
              required
              value={settings.hotline1}
              onChange={(e) => setSettings({ ...settings, hotline1: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Hotline 2 (Phụ)
            </label>
            <input
              type="text"
              value={settings.hotline2}
              onChange={(e) => setSettings({ ...settings, hotline2: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Số điện thoại Zalo
            </label>
            <input
              type="text"
              value={settings.zalo}
              onChange={(e) => setSettings({ ...settings, zalo: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Email liên hệ
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Giờ mở cửa làm việc
            </label>
            <input
              type="text"
              value={settings.workingHours}
              onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Địa chỉ kho hàng
          </label>
          <input
            type="text"
            required
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Giới thiệu ngắn (Chân trang)
          </label>
          <textarea
            rows={3}
            value={settings.aboutShort}
            onChange={(e) => setSettings({ ...settings, aboutShort: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-gray-300 outline-none focus:border-[#f49712]"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#f49712] hover:bg-[#d8820a] text-white text-xs font-bold uppercase px-6 py-2.5 flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Đang lưu...' : 'Lưu Thay Đổi Cài Đặt'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
