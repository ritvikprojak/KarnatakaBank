package com.projak.karnatak.migration.jpa;


import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.apache.log4j.Logger;

import com.projak.karnatak.migration.model.cases;
import com.projak.karnatak.migration.model.casesoutput;
import com.projak.karnatak.migration.model.docMapping;
import com.projak.karnatak.migration.model.document;


public class EntitySearch {

	final static Logger logger = Logger.getLogger(EntitySearch.class);
	

	public List<cases> getCases() {
		
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("Migration");

		EntityManager em = emf.createEntityManager();

		List<cases> casesList = null;

		try {
			em.getTransaction().begin();

			CriteriaBuilder cb = em.getCriteriaBuilder();

			CriteriaQuery<cases> selectCriteria = cb.createQuery(cases.class);

			Root<cases> root = selectCriteria.from(cases.class);

			selectCriteria.select(root).where(cb.equal(root.get("uploadStatus"), false));

			casesList = em.createQuery(selectCriteria).setMaxResults(10).getResultList();

			logger.info("Case List Size : " + casesList.size());

			logger.info(casesList.size());

			return casesList;

		} catch (Exception ex) {

			logger.debug("Error in getting cases", ex);
			logger.error(ex.getLocalizedMessage());

			return null;
		} finally {
			em.close();

			emf.close();

		}

	}

	public String getDocument(String docCode) {
		
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("Migration");

		EntityManager em = emf.createEntityManager();
		try {
			em.getTransaction().begin();

			docMapping q = em.find(docMapping.class, docCode);

			return q.getDocumentClass();

		} catch (Exception ex) {

			logger.debug("Error in getting document class for docCode : "+docCode, ex);
			logger.error(ex.getLocalizedMessage());
			return null;

		} finally {
			em.close();

			emf.close();

		}

	}

	public List<document> getDocuments(cases input) {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("Migration");

		EntityManager em = emf.createEntityManager();
		try {
			em.getTransaction().begin();

			CriteriaBuilder cb = em.getCriteriaBuilder();

			CriteriaQuery<document> selectCriteria = cb.createQuery(document.class);

			Root<document> root = selectCriteria.from(document.class);

			selectCriteria.select(root).where(cb.equal(root.get("leadNumber"), input.getLeadNumber()));

			List<document> documentList = em.createQuery(selectCriteria).getResultList();

			System.out.println(documentList.size());

			return documentList;

		} catch (Exception ex) {

			logger.debug("Error in getting documents for case : "+input.toString(), ex);
			logger.error(ex.getLocalizedMessage());
			return null;

		} finally {
			em.close();

			emf.close();

		}

	}

	public List<document> getDocuments(casesoutput cases) {
		
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("Migration");

		EntityManager em = emf.createEntityManager();
		try {
			em.getTransaction().begin();

			CriteriaBuilder cb = em.getCriteriaBuilder();

			CriteriaQuery<document> selectCriteria = cb.createQuery(document.class);

			Root<document> root = selectCriteria.from(document.class);

			selectCriteria.select(root).where(cb.equal(root.get("leadNumber"), cases.getLeadNumber()));

			List<document> documentList = em.createQuery(selectCriteria).getResultList();

			logger.info(documentList.size());
			
			return documentList;
			
		} catch (Exception ex) {

			logger.debug("Error in getting documents for cases: "+cases.toString(), ex);
			logger.error(ex.getLocalizedMessage());
			return null;

			
		} finally {
			
			em.close();

			emf.close();

		}
		
	}

}
