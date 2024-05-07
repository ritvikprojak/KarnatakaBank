package com.projak.karnatak.migration.jpa;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaUpdate;
import javax.persistence.criteria.Root;

import org.apache.log4j.Logger;

import com.projak.karnatak.migration.model.cases;
import com.projak.karnatak.migration.model.casesoutput;
import com.projak.karnatak.migration.model.documentOutput;

public class EntityCreation {

	private final static Logger logger = Logger.getLogger(EntityCreation.class);
	
//	private final static EntityManagerFactory emf = Persistence.createEntityManagerFactory("Migration");

	public void persistObject(documentOutput doc) {
		
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("Migration");

		EntityManager em = emf.createEntityManager();

		try {

			em.getTransaction().begin();

			em.persist(doc);

			em.getTransaction().commit();

		} catch (Exception ex) {

			logger.debug("Error in persisting document output : "+doc.toString(), ex);
			logger.error(ex.getLocalizedMessage());

		} finally {
			
			doc = null;
			
			em.close();

			emf.close();
		}
	}

	public void persistObject(casesoutput output) {
		
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("Migration");

		EntityManager em = emf.createEntityManager();

		try {

			em.getTransaction().begin();

			em.persist(output);

			em.getTransaction().commit();
			
		} catch (Exception ex) {
			
			logger.debug("Error in persisting cases output : "+output.toString(), ex);
			logger.error(ex.getLocalizedMessage());
			
		} finally {
			
//			output = null;
			
			em.close();

			emf.close();
		}
	}

	public void updateObject(cases output) {
		
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("Migration");

		EntityManager em = emf.createEntityManager();

		System.out.println("Output Status : " + output.getUploadStatus());
		try {
			em.getTransaction().begin();

			output.setUploadStatus(true);

			CriteriaBuilder cb = em.getCriteriaBuilder();

			CriteriaUpdate<cases> updateCriteria = cb.createCriteriaUpdate(cases.class);

			Root<cases> root = updateCriteria.from(cases.class);

			updateCriteria.set(root.get("uploadStatus"), true);

			updateCriteria.where(cb.equal(root.get("leadNumber"), output.getLeadNumber()));

			int affected = em.createQuery(updateCriteria).executeUpdate();

			System.out.println("Affected row: " + affected);

			em.getTransaction().commit();

			em.getTransaction().begin();

			em.refresh(em.merge(output));

			em.getTransaction().commit();
		} catch (Exception ex) {

			logger.debug("Error in updating cases : "+output.toString() , ex);
			logger.error(ex.getLocalizedMessage());
			
		} finally {
			
			output = null;
			
			em.close();

			emf.close();
		}
	}

}
