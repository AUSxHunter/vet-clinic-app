'use client';

import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

export default function MultiSelect({
  label,
  options = [],
  selected = [],
  onChange,
  placeholder = 'Select items...',
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (id) => {
    const updated = selected.includes(id)
      ? selected.filter(s => s !== id)
      : [...selected, id];
    onChange(updated);
  };

  const selectedLabels = options
    .filter(o => selected.includes(o.id))
    .map(o => o.label);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-platinum">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full glass text-left flex items-center justify-between p-3 hover:border-gold/50"
        >
          <span className={selectedLabels.length ? '' : 'text-platinum/50'}>
            {selectedLabels.length ? `${selectedLabels.length} selected` : placeholder}
          </span>
          <ChevronDown
            size={20}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 glass z-10 max-h-64 overflow-y-auto">
            <div className="p-2 space-y-1">
              {options.map(option => (
                <label
                  key={option.id}
                  className="flex items-center gap-3 p-2 hover:bg-white/5 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option.id)}
                    onChange={() => handleToggle(option.id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm">{option.label}</span>
                  <span className="text-xs text-gold ml-auto">
                    ${option.price}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {selectedLabels.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedLabels.map((label, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full text-sm text-gold"
              >
                {label}
                <button
                  onClick={() => {
                    const optionId = options.find(o => o.label === label)?.id;
                    handleToggle(optionId);
                  }}
                  className="hover:text-gold/70"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
