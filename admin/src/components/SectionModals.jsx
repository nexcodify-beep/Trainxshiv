import React, { useState } from 'react';
import {
  X,
  Save,
  Award,
  User,
  Sparkles,
  UtensilsCrossed,
  Images,
  Phone,
  Instagram,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Flame,
  Dumbbell,
  Target,
  BarChart3,
  RefreshCw,
  Plus,
  Trash2,
} from 'lucide-react';

export default function SectionModals({ modalType, data, onClose, onSave }) {
  if (!modalType) return null;

  // Local draft state initialized from parent data
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(data)));

  const handleSave = () => {
    onSave(draft);
    onClose();
  };

  return (
    <div className="section-modal-overlay" onClick={onClose}>
      <div className="section-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="section-modal-header">
          <div className="sm-header-meta">
            {modalType === 'certificates' && (
              <>
                <Award size={22} className="text-yellow" />
                <div>
                  <h3>Certifications &amp; Specializations (4 Required Slots)</h3>
                  <p>Order: 1. Personal Training &bull; 2. Nutrition &bull; 3. Injury Rehab &bull; 4. Specialization</p>
                </div>
              </>
            )}
            {modalType === 'head_trainer' && (
              <>
                <User size={22} className="text-yellow" />
                <div>
                  <h3>Master Coach Shivam — Bio &amp; Transformation</h3>
                  <p>Master Coach introduction, before/after transformation stats, and photo links</p>
                </div>
              </>
            )}
            {modalType === 'metrics_strip' && (
              <>
                <BarChart3 size={22} className="text-yellow" />
                <div>
                  <h3>About Page Metrics Strip</h3>
                  <p>Configure the 4 key metrics: Muscle Gain, Fat Reduction, 100% Natural, 7+ Years Experience</p>
                </div>
              </>
            )}
            {modalType === 'home_hero' && (
              <>
                <Sparkles size={22} className="text-yellow" />
                <div>
                  <h3>Home Page Hero &amp; Counter Stats</h3>
                  <p>Main title, subhead, 7+ Years coaching, 100% success rate, and 500+ transformations</p>
                </div>
              </>
            )}
            {modalType === 'instagram_reviews' && (
              <>
                <Instagram size={22} className="text-yellow" />
                <div>
                  <h3>TrainXShiv Reviews on Instagram</h3>
                  <p>Configure Instagram review section title, handle, and client reels links</p>
                </div>
              </>
            )}
            {modalType === 'diet_generator' && (
              <>
                <UtensilsCrossed size={22} className="text-yellow" />
                <div>
                  <h3>Diet Plan Generator &amp; ₹99 WhatsApp Checkout</h3>
                  <p>Set WhatsApp checkout number, ₹99 payment instructions, and macro defaults</p>
                </div>
              </>
            )}
            {modalType === 'brand_contact' && (
              <>
                <Phone size={22} className="text-yellow" />
                <div>
                  <h3>Brand, Contact &amp; Social Links</h3>
                  <p>WhatsApp number, official phone, email, address, and announcement bar</p>
                </div>
              </>
            )}
          </div>

          <button type="button" className="sm-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="section-modal-body">
          {/* ========================================================
              1. CERTIFICATES MODAL (1. PT, 2. Nutrition, 3. Injury, 4. Specialization)
          ======================================================== */}
          {modalType === 'certificates' && (
            <div className="sm-form-grid">
              <div className="sm-notice-box">
                <ShieldCheck size={18} color="#FFD700" />
                <div>
                  <strong>Official Accreditations Display Order</strong>
                  <p>
                    These 4 certificates display on the About Trainer page slider and can be enlarged in full-screen.
                    Make sure the order matches your qualifications: 1. Personal Training, 2. Nutrition, 3. Injury &amp; Rehab, 4. Specialization.
                  </p>
                </div>
              </div>

              {(draft.certificates || []).map((cert, idx) => (
                <div key={cert.id || idx} className="sm-cert-card-edit">
                  <div className="sm-cert-card-header">
                    <span className="sm-order-badge">Slot {idx + 1}: {cert.badge || `Certificate ${idx + 1}`}</span>
                    <span className="sm-verified-pill">Active Credential</span>
                  </div>

                  <div className="sm-cert-row">
                    <div className="sm-cert-preview">
                      <img
                        src={cert.img || `/images/certificate/personal-training.svg`}
                        alt={cert.title}
                        onError={(e) => {
                          e.target.src = '/images/certificate/personal-training.svg';
                        }}
                      />
                      <span>Live Preview</span>
                    </div>

                    <div className="sm-cert-fields">
                      <div className="form-group">
                        <label className="form-label">Certificate Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={cert.title || ''}
                          onChange={(e) => {
                            const next = [...(draft.certificates || [])];
                            next[idx].title = e.target.value;
                            setDraft({ ...draft, certificates: next });
                          }}
                        />
                      </div>

                      <div className="grid-2">
                        <div className="form-group">
                          <label className="form-label">Issuing Organization / Board</label>
                          <input
                            type="text"
                            className="form-control"
                            value={cert.org || ''}
                            onChange={(e) => {
                              const next = [...(draft.certificates || [])];
                              next[idx].org = e.target.value;
                              setDraft({ ...draft, certificates: next });
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Badge Label</label>
                          <input
                            type="text"
                            className="form-control"
                            value={cert.badge || ''}
                            onChange={(e) => {
                              const next = [...(draft.certificates || [])];
                              next[idx].badge = e.target.value;
                              setDraft({ ...draft, certificates: next });
                            }}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Certificate Image File Path / URL</label>
                        <input
                          type="text"
                          className="form-control"
                          value={cert.img || ''}
                          placeholder="/images/certificate/personal-training.jpg"
                          onChange={(e) => {
                            const next = [...(draft.certificates || [])];
                            next[idx].img = e.target.value;
                            setDraft({ ...draft, certificates: next });
                          }}
                        />
                        <span className="form-helper">
                          Available in <code>frontend/public/images/certificate/</code> (e.g., <code>/images/certificate/personal-training.jpg</code>, <code>/images/certificate/nutrition.jpg</code>, <code>/images/certificate/injury.jpg</code>, <code>/images/certificate/specialization.jpg</code>)
                        </span>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Key Competencies / Description</label>
                        <textarea
                          rows={2}
                          className="form-control"
                          value={cert.desc || ''}
                          onChange={(e) => {
                            const next = [...(draft.certificates || [])];
                            next[idx].desc = e.target.value;
                            setDraft({ ...draft, certificates: next });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ========================================================
              2. MASTER COACH SHIVAM & TRANSFORMATION MODAL
          ======================================================== */}
          {modalType === 'head_trainer' && (
            <div className="sm-form-grid">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={draft.headTrainer?.name || ''}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        headTrainer: { ...draft.headTrainer, name: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Designation / Role</label>
                  <input
                    type="text"
                    className="form-control"
                    value={draft.headTrainer?.role || 'Master Coach'}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        headTrainer: { ...draft.headTrainer, role: e.target.value, badge: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Master Coach Bio &amp; Philosophy</label>
                <textarea
                  rows={4}
                  className="form-control"
                  value={draft.headTrainer?.bio || ''}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      headTrainer: { ...draft.headTrainer, bio: e.target.value },
                    })
                  }
                />
              </div>

              <h4 className="sm-subhead">Shivam Transformation Visual Cards (Before &amp; After)</h4>
              <div className="grid-2">
                <div className="sm-subcard">
                  <h5>Before Transformation Card</h5>
                  <div className="form-group">
                    <label className="form-label">Before Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={draft.headTrainer?.beforeImg || '/images/trainers/shivan_before.jpg'}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          headTrainer: { ...draft.headTrainer, beforeImg: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="grid-3">
                    <div className="form-group">
                      <label className="form-label">Weight</label>
                      <input
                        type="text"
                        className="form-control"
                        value={draft.headTrainer?.beforeWeight || '58 KG'}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            headTrainer: { ...draft.headTrainer, beforeWeight: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Body Fat</label>
                      <input
                        type="text"
                        className="form-control"
                        value={draft.headTrainer?.beforeFat || '19%'}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            headTrainer: { ...draft.headTrainer, beforeFat: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Year</label>
                      <input
                        type="text"
                        className="form-control"
                        value={draft.headTrainer?.beforeYear || '2018'}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            headTrainer: { ...draft.headTrainer, beforeYear: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="sm-subcard">
                  <h5>After Transformation Card</h5>
                  <div className="form-group">
                    <label className="form-label">After Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={draft.headTrainer?.afterImg || '/images/trainers/shivan_after.jpg'}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          headTrainer: { ...draft.headTrainer, afterImg: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="grid-3">
                    <div className="form-group">
                      <label className="form-label">Weight</label>
                      <input
                        type="text"
                        className="form-control"
                        value={draft.headTrainer?.afterWeight || '76 KG'}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            headTrainer: { ...draft.headTrainer, afterWeight: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Body Fat</label>
                      <input
                        type="text"
                        className="form-control"
                        value={draft.headTrainer?.afterFat || '10%'}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            headTrainer: { ...draft.headTrainer, afterFat: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Year</label>
                      <input
                        type="text"
                        className="form-control"
                        value={draft.headTrainer?.afterYear || '2024'}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            headTrainer: { ...draft.headTrainer, afterYear: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Watch My Story (Instagram Reel / Video URL)</label>
                <input
                  type="text"
                  className="form-control"
                  value={draft.brand?.instagram || 'https://www.instagram.com/trainxshiv/'}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      brand: { ...draft.brand, instagram: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* ========================================================
              3. METRICS STRIP MODAL
          ======================================================== */}
          {modalType === 'metrics_strip' && (
            <div className="sm-form-grid">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Metric 1: Muscle Gain</label>
                  <input
                    type="text"
                    className="form-control"
                    value={draft.aboutMetrics?.muscle || '+18 KG'}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        aboutMetrics: { ...(draft.aboutMetrics || {}), muscle: e.target.value },
                      })
                    }
                  />
                  <span className="form-helper">Subtext: Lean Muscle Gained</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Metric 2: Body Fat Reduction</label>
                  <input
                    type="text"
                    className="form-control"
                    value={draft.aboutMetrics?.fat || '10%'}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        aboutMetrics: { ...(draft.aboutMetrics || {}), fat: e.target.value },
                      })
                    }
                  />
                  <span className="form-helper">Subtext: Body Fat Reduced</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Metric 3: Method</label>
                  <input
                    type="text"
                    className="form-control"
                    value={draft.aboutMetrics?.natural || '100%'}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        aboutMetrics: { ...(draft.aboutMetrics || {}), natural: e.target.value },
                      })
                    }
                  />
                  <span className="form-helper">Subtext: Natural &amp; Sustainable</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Metric 4: Experience</label>
                  <input
                    type="text"
                    className="form-control"
                    value={draft.aboutMetrics?.experience || '7+ Years'}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        aboutMetrics: { ...(draft.aboutMetrics || {}), experience: e.target.value },
                      })
                    }
                  />
                  <span className="form-helper">Subtext: Fitness Coaching Experience</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              4. HOME HERO & COUNTER STATS MODAL
          ======================================================== */}
          {modalType === 'home_hero' && (
            <div className="sm-form-grid">
              <div className="form-group">
                <label className="form-label">Hero Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={draft.hero?.title || 'Transform Your Body. Elevate Your Mind.'}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      hero: { ...(draft.hero || {}), title: e.target.value },
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hero Subtitle</label>
                <textarea
                  rows={3}
                  className="form-control"
                  value={draft.hero?.sub || 'Personalized fitness coaching, tailored nutrition plans, and continuous accountability designed to achieve natural, lifelong results.'}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      hero: { ...(draft.hero || {}), sub: e.target.value },
                    })
                  }
                />
              </div>

              <h4 className="sm-subhead">Homepage Counter Stats</h4>
              <div className="grid-3">
                <div className="form-group">
                  <label className="form-label">Experience</label>
                  <input
                    type="text"
                    className="form-control"
                    value={draft.hero?.experienceStat || '7+ Years'}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        hero: { ...(draft.hero || {}), experienceStat: e.target.value },
                      })
                    }
                  />
                  <span className="form-helper">Shows: 7+ Years Coaching</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Success Rate</label>
                  <input
                    type="text"
                    className="form-control"
                    value={draft.hero?.successRateStat || '100%'}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        hero: { ...(draft.hero || {}), successRateStat: e.target.value },
                      })
                    }
                  />
                  <span className="form-helper">Shows: 100% Success Rate</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Transformations Count</label>
                  <input
                    type="text"
                    className="form-control"
                    value={draft.hero?.clientsStat || '500+'}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        hero: { ...(draft.hero || {}), clientsStat: e.target.value },
                      })
                    }
                  />
                  <span className="form-helper">Shows: 500+ Happy Clients</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              5. INSTAGRAM REVIEWS MODAL
          ======================================================== */}
          {modalType === 'instagram_reviews' && (
            <div className="sm-form-grid">
              <div className="form-group">
                <label className="form-label">Section Heading</label>
                <input
                  type="text"
                  className="form-control"
                  value={draft.brand?.instagramSectionTitle || 'TrainXShiv Reviews on Instagram'}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      brand: { ...(draft.brand || {}), instagramSectionTitle: e.target.value },
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Instagram Username / Handle</label>
                <input
                  type="text"
                  className="form-control"
                  value={draft.brand?.instagramUsername || '@trainxshiv'}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      brand: { ...(draft.brand || {}), instagramUsername: e.target.value },
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Instagram Profile URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={draft.brand?.instagram || 'https://www.instagram.com/trainxshiv/'}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      brand: { ...(draft.brand || {}), instagram: e.target.value },
                    })
                  }
                />
              </div>

              <div className="sm-notice-box">
                <Instagram size={18} color="#FFD700" />
                <div>
                  <strong>Connected to Instagram Reels</strong>
                  <p>
                    User can tap &ldquo;Watch on Instagram&rdquo; on any transformation card or video review to open your official Instagram Reels video directly.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              6. DIET PLAN GENERATOR & ₹99 CHECKOUT MODAL
          ======================================================== */}
          {modalType === 'diet_generator' && (
            <div className="sm-form-grid">
              <div className="form-group">
                <label className="form-label">WhatsApp Number for ₹99 Payment Redirect</label>
                <input
                  type="text"
                  className="form-control"
                  value={draft.brand?.whatsapp || '917080263878'}
                  placeholder="917080263878"
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      brand: { ...(draft.brand || {}), whatsapp: e.target.value },
                    })
                  }
                />
                <span className="form-helper">Users are redirected to this WhatsApp number to pay ₹99 for personalized macro meal delivery.</span>
              </div>

              <div className="form-group">
                <label className="form-label">Payment Price (INR)</label>
                <input
                  type="text"
                  className="form-control"
                  value={draft.brand?.dietGeneratorPrice || '₹99'}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      brand: { ...(draft.brand || {}), dietGeneratorPrice: e.target.value },
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Pre-filled WhatsApp Message Template</label>
                <textarea
                  rows={3}
                  className="form-control"
                  value={draft.brand?.dietGeneratorMsg || 'Hi Coach Shivam! I just generated my custom diet plan on TrainXShiv. I would like to pay ₹99 and receive my full personalized Indian meal plan on WhatsApp.'}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      brand: { ...(draft.brand || {}), dietGeneratorMsg: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* ========================================================
              7. BRAND, CONTACT & ANNOUNCEMENT MODAL
          ======================================================== */}
          {modalType === 'brand_contact' && (
            <div className="sm-form-grid">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={draft.brand?.phone || '+91 7080268538'}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        brand: { ...(draft.brand || {}), phone: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">WhatsApp Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={draft.brand?.whatsapp || '917080263878'}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        brand: { ...(draft.brand || {}), whatsapp: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={draft.brand?.email || 'trainxshiv@gmail.com'}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        brand: { ...(draft.brand || {}), email: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location / Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={draft.brand?.address || 'Lucknow, Uttar Pradesh'}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        brand: { ...(draft.brand || {}), address: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <h4 className="sm-subhead">Top Announcement Bar</h4>
              <div className="form-group">
                <label className="form-label">Announcement Text</label>
                <input
                  type="text"
                  className="form-control"
                  value={draft.brand?.announcement || 'Transform Your Body With TrainXShiv — Admissions Open for New Coaching Batch!'}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      brand: { ...(draft.brand || {}), announcement: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="section-modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            <Save size={16} /> Save Changes &amp; Sync to MySQL
          </button>
        </div>
      </div>
    </div>
  );
}

