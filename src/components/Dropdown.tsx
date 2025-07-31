import { useState, useRef, useEffect } from "react";

type DropdownArrowMenuProps = {
  options: {
    label: string;
    action: () => void;
    disabled?: boolean;
    isTitle?: boolean;
  }[];
};

export default function Dropdown({ options }: DropdownArrowMenuProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLSpanElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        style={{
          fontSize: "14px",
          cursor: "pointer",
          lineHeight: 1,
          userSelect: "none",
          color: "green",
        }}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        ▼
      </span>

      {open && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: "4px",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
            minWidth: "160px",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          {options.map(({ label, action, disabled, isTitle }, i) => (
            <div
              key={i}
              onClick={() => {
                if (!isTitle && !disabled) {
                  setOpen(false);
                  action();
                }
              }}
              style={{
                padding: "6px 16px",
                fontWeight: isTitle ? "bold" : 500,
                color: isTitle ? "#000" : disabled ? "#aaa" : "#1976d2",
                backgroundColor: "transparent",
                borderBottom: isTitle ? "1px solid #ccc" : "none",
                textTransform: "none",
                pointerEvents: isTitle || disabled ? "none" : "auto",
                cursor: isTitle || disabled ? "default" : "pointer",
                transition: "background 0.2s ease-in-out",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                if (!isTitle && !disabled)
                  e.currentTarget.style.backgroundColor = "#e3f2fd";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
