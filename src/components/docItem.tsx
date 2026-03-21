import { motion } from "framer-motion";
import React from "react";

export function DockItem({ item, isActive, onClick }) {
    const [hovered, setHovered] = React.useState(false);
  
    return (
      <motion.button
        className="dock-button"
        onClick={onClick}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        style={{
          background: 'transparent',
          border: 'none',
          padding: '6px 4px 0',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          position: 'relative',
          minWidth: '56px',
          justifyContent: 'flex-end',
          overflow: 'visible',
        }}
      >
        {/* Tooltip */}
        <motion.div
          className="dock-label"
          initial={{ opacity: 0, y: 4, scale: 0.9 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4, scale: hovered ? 1 : 0.9 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            background: 'rgba(28, 28, 30, 0.9)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '8px',
            padding: '4px 10px',
            fontSize: '12px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.9)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            letterSpacing: '0.01em',
          }}
        >
          {item.label}
          {/* Tooltip arrow */}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid rgba(255,255,255,0.12)',
          }} />
        </motion.div>
  
        {/* Icon container */}
        <motion.div
          className="dock-icon"
          animate={{
            scale: hovered ? 1.08 : 1,
            y: hovered ? -4 : 0,
            background: isActive
              ? 'linear-gradient(145deg, rgba(0, 122, 255, 0.3), rgba(175, 82, 222, 0.25))'
              : hovered
              ? 'linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.07))'
              : 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))',
            boxShadow: isActive
              ? '0 4px 16px rgba(0, 122, 255, 0.35), 0 1px 0 rgba(255,255,255,0.15) inset'
              : hovered
              ? '0 6px 20px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.1) inset'
              : '0 2px 8px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.07) inset',
            borderColor: isActive
              ? 'rgba(0, 122, 255, 0.4)'
              : 'rgba(255, 255, 255, 0.08)',
          }}
          transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isActive ? '#60a5fa' : 'rgba(255,255,255,0.75)',
            transition: 'color 0.2s ease',
          }}
        >
          <item.icon size={22} strokeWidth={1.75} />
        </motion.div>
  
        {/* Active dot */}
        <div style={{ height: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isActive && (
            <motion.div
              layoutId="activeDot"
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#3b82f6',
                boxShadow: '0 0 6px rgba(59,130,246,0.8)',
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </div>
      </motion.button>
    );
  }
