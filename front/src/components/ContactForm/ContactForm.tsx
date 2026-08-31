import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useContactForm } from '../../hooks/useContactForm';

const inputBaseClasses = 'rounded-lg border px-3 py-2.5 font-sans text-sm outline-none focus:border-slate-500';

export function ContactForm() {
  const { t } = useTranslation();
  const { formData, fieldErrors, status, updateField, submit } = useContactForm();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    void submit();
  }

  const isSubmitting = status === 'submitting';

  return (
    <section id="contact" className="bg-slate-100 px-4 py-14 pb-18 sm:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">{t('contact.title')}</h2>
        <p className="mb-8 text-slate-600">{t('contact.subtitle')}</p>

        <form className="flex flex-col gap-4 text-left" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-800" htmlFor="fullName">
              {t('contact.fullNameLabel')}
            </label>
            <input
              id="fullName"
              className={`${inputBaseClasses} ${fieldErrors.fullName ? 'border-red-600' : 'border-slate-300'}`}
              type="text"
              placeholder={t('contact.fullNamePlaceholder')}
              value={formData.fullName}
              onChange={(event) => updateField('fullName', event.target.value)}
            />
            {fieldErrors.fullName && (
              <span className="text-sm text-red-600">{t('contact.validation.fullNameRequired')}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-800" htmlFor="email">
              {t('contact.emailLabel')}
            </label>
            <input
              id="email"
              className={`${inputBaseClasses} ${fieldErrors.email ? 'border-red-600' : 'border-slate-300'}`}
              type="email"
              placeholder={t('contact.emailPlaceholder')}
              value={formData.email}
              onChange={(event) => updateField('email', event.target.value)}
            />
            {fieldErrors.email && <span className="text-sm text-red-600">{t('contact.validation.emailInvalid')}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-800" htmlFor="message">
              {t('contact.messageLabel')}
            </label>
            <textarea
              id="message"
              className={`${inputBaseClasses} min-h-28 resize-y ${
                fieldErrors.message ? 'border-red-600' : 'border-slate-300'
              }`}
              placeholder={t('contact.messagePlaceholder')}
              value={formData.message}
              onChange={(event) => updateField('message', event.target.value)}
            />
            {fieldErrors.message && (
              <span className="text-sm text-red-600">{t('contact.validation.messageTooShort')}</span>
            )}
          </div>

          <button
            className="mt-2 rounded-lg bg-slate-900 px-4 py-3 text-white transition-colors hover:enabled:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('contact.submitting') : t('contact.submitButton')}
          </button>

          {status === 'success' && <p className="mt-2 text-sm text-green-700">{t('contact.successMessage')}</p>}
          {status === 'error' && <p className="mt-2 text-sm text-red-600">{t('contact.errorMessage')}</p>}
        </form>
      </div>
    </section>
  );
}
