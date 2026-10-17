"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NotificationItem {
  id: string;
  type: "follow" | "like_post" | "like_comment" | "save" | "repost" | "mention" | "order";
  user: {
    name: string;
    avatar: string;
    handle: string;
  };
  actionText: string;
  targetPreview?: string;
  timeAgo: string;
  isRead: boolean;
}

const SAMPLE_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    type: "follow",
    user: {
      name: "สมศรี เกษตรยั่งยืน",
      avatar: "🌾",
      handle: "@somsri_eco",
    },
    actionText: "เริ่มติดตามคุณ",
    timeAgo: "1 วันที่แล้ว",
    isRead: false,
  },
  {
    id: "notif-2",
    type: "like_post",
    user: {
      name: "Green Cafe BKK",
      avatar: "☕",
      handle: "@greencafe_bkk",
    },
    actionText: "ถูกใจโพสต์ของคุณ",
    targetPreview: "ดรอปเทสต์! ทดสอบโฟมเห็ดไมซีเลียมกับขวดเซรั่มแก้ว",
    timeAgo: "2 วันที่แล้ว",
    isRead: false,
  },
  {
    id: "notif-3",
    type: "like_comment",
    user: {
      name: "วิชาญ ช่างแพ็ก",
      avatar: "📦",
      handle: "@wichan_pack",
    },
    actionText: "ถูกใจความคิดเห็นของคุณ: 'ผักตบชวาอบแห้งรับน้ำหนักได้ดีมาก ไม่ยุบตัว'",
    timeAgo: "1 สัปดาห์ที่แล้ว",
    isRead: true,
  },
  {
    id: "notif-4",
    type: "save",
    user: {
      name: "Organic Living",
      avatar: "🌿",
      handle: "@organic_living_th",
    },
    actionText: "บันทึกโพสต์ของคุณลงในคอลเลกชัน",
    targetPreview: "เปลี่ยนแพ็กเกจจิ้งส่งของเป็นผักตบชวาอบแห้ง 100%",
    timeAgo: "2 สัปดาห์ที่แล้ว",
    isRead: true,
  },
  {
    id: "notif-5",
    type: "repost",
    user: {
      name: "ขวัญฤดี Zero Waste",
      avatar: "🍃",
      handle: "@kwan_zerowaste",
    },
    actionText: "รีโพสต์เรื่องราวรักษ์โลกของคุณ",
    targetPreview: "สรุปยอดลดคาร์บอนจากการใช้แพ็กเกจจิ้งรักษ์โลกประจำเดือน",
    timeAgo: "1 เดือนที่แล้ว",
    isRead: true,
  },
  {
    id: "notif-6",
    type: "mention",
    user: {
      name: "Thai Eco Community",
      avatar: "🌱",
      handle: "@thai_eco_comm",
    },
    actionText: "กล่าวถึงคุณในความคิดเห็น: '@ecolife_narin รีวิวตัวนี้ละเอียดมาก'",
    timeAgo: "1 เดือนที่แล้ว",
    isRead: true,
  },
  {
    id: "notif-7",
    type: "order",
    user: {
      name: "ระบบ Greeny Express",
      avatar: "🚚",
      handle: "@greeny_logistics",
    },
    actionText: "พัสดุหมายเลข TH9823482103 จัดส่งถึงคุณเรียบร้อยแล้ว",
    targetPreview: "ผักตบชวาอบแห้ง 1 กก. (x3 ชิ้น)",
    timeAgo: "3 วันที่แล้ว",
    isRead: false,
  },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "social" | "orders">("all");
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const filteredNotifs = notifications.filter((n) => {
    if (filter === "orders") return n.type === "order";
    if (filter === "social") return n.type !== "order";
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/me"
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </Link>
          <div>
            <h1 className="font-display font-extrabold text-2xl text-on-surface">การแจ้งเตือน</h1>
            <p className="text-xs text-secondary">อัปเดตกิจกรรมทางสังคมและสถานะคำสั่งซื้อของคุณ</p>
          </div>
        </div>

        <button
          type="button"
          onClick={markAllRead}
          className="text-xs font-bold text-primary hover:underline"
        >
          อ่านทั้งหมดแล้ว
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
        {[
          { id: "all", label: "ทั้งหมด" },
          { id: "social", label: "กิจกรรมชุมชน & ผู้ติดตาม" },
          { id: "orders", label: "คำสั่งซื้อ & พัสดุ" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === tab.id
                ? "bg-primary text-white shadow-2xs"
                : "bg-surface-container-low text-secondary hover:bg-surface-container"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List (PDF Page 16) */}
      <div className="space-y-2">
        {filteredNotifs.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-3xl p-12 text-center text-secondary text-xs">
            ไม่มีการแจ้งเตือนใหม่ในหมวดหมู่นี้
          </div>
        ) : (
          filteredNotifs.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                item.isRead
                  ? "bg-surface-container-lowest border-outline-variant/20 text-on-surface"
                  : "bg-surface-container-low border-primary/30 shadow-2xs"
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-lg flex-shrink-0">
                  {item.user.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-xs leading-relaxed">
                    <span className="font-bold text-on-surface">{item.user.name}</span>{" "}
                    <span className="text-secondary">{item.actionText}</span>
                  </div>
                  {item.targetPreview && (
                    <div className="mt-1 text-[11px] text-primary font-medium bg-surface-container/60 px-2.5 py-1 rounded-lg truncate">
                      "{item.targetPreview}"
                    </div>
                  )}
                  <div className="text-[10px] text-secondary mt-1">{item.timeAgo}</div>
                </div>
              </div>

              {!item.isRead && (
                <span className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0 mt-2" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
