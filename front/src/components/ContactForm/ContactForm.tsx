import { useEffect } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useContactForm } from '../../hooks/useContactForm';

const inputBaseClasses =
  'w-full rounded-lg border bg-white px-3.5 py-3 text-sm text-ink-800 outline-none placeholder:text-ink-400 focus:border-ink-600';

export function ContactForm() {
  const { t } = useTranslation();
  const { formData, fieldErrors, status, updateField, submit } = useContactForm();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    void submit();
  }

  const isSubmitting = status === 'submitting';

  useEffect(() => {
    if (status === 'success') {
      toast.success(t('contact.successMessage'));
    } else if (status === 'error') {
      toast.error(t('contact.errorMessage'));
    }
  }, [status, t]);

  return (
    <section id="contact" className="scroll-mt-16 border-t border-line bg-paper px-6 py-14 sm:px-20 sm:py-[100px]">
      <div className="mx-auto max-w-md text-center sm:max-w-[560px]">
        <h2 className="font-display text-[22px] text-ink-900 sm:text-[30px]">{t('contact.title')}</h2>
        <p className="mx-auto mt-3.5 max-w-[440px] text-sm text-ink-600 sm:text-[15px]">{t('contact.subtitle')}</p>

        <form className="mt-11 flex flex-col gap-[18px] text-left" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-[18px] sm:flex-row">
            <div className="flex-1">
              <label className="mb-[7px] block text-[13px] font-medium text-ink-800" htmlFor="fullName">
                {t('contact.fullNameLabel')}
              </label>
              <input
                id="fullName"
                className={`${inputBaseClasses} ${fieldErrors.fullName ? 'border-red-600' : 'border-line'}`}
                type="text"
                placeholder={t('contact.fullNamePlaceholder')}
                value={formData.fullName}
                onChange={(event) => updateField('fullName', event.target.value)}
              />
              {fieldErrors.fullName && (
                <span className="mt-1 block text-sm text-red-600">{t('contact.validation.fullNameRequired')}</span>
              )}
            </div>

            <div className="flex-1">
              <label className="mb-[7px] block text-[13px] font-medium text-ink-800" htmlFor="email">
                {t('contact.emailLabel')}
              </label>
              <input
                id="email"
                className={`${inputBaseClasses} ${fieldErrors.email ? 'border-red-600' : 'border-line'}`}
                type="email"
                placeholder={t('contact.emailPlaceholder')}
                value={formData.email}
                onChange={(event) => updateField('email', event.target.value)}
              />
              {fieldErrors.email && (
                <span className="mt-1 block text-sm text-red-600">{t('contact.validation.emailInvalid')}</span>
              )}
            </div>
          </div>

          <div>
            <label className="mb-[7px] block text-[13px] font-medium text-ink-800" htmlFor="message">
              {t('contact.messageLabel')}
            </label>
            <textarea
              id="message"
              className={`${inputBaseClasses} h-24 resize-none ${fieldErrors.message ? 'border-red-600' : 'border-line'}`}
              placeholder={t('contact.messagePlaceholder')}
              value={formData.message}
              onChange={(event) => updateField('message', event.target.value)}
            />
            {fieldErrors.message && (
              <span className="mt-1 block text-sm text-red-600">{t('contact.validation.messageTooShort')}</span>
            )}
          </div>

          <button
            className="font-display mt-1 rounded-lg bg-ink-900 py-3.5 text-[15px] font-semibold tracking-wide text-white transition-colors hover:enabled:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('contact.submitting') : t('contact.submitButton')}
          </button>
        </form>
      </div>
    </section>
  );
}
